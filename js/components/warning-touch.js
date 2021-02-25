// Shim for requestAnimationFrame from Paul Irishpaul ir
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
  'use strict';

  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

const TOUCH_STATE = Object.freeze({
  DEFAULT: 1,
  LEFT_SIDE: 2,
  RIGHT_SIDE: 3
});

const MODEL_STATE = Object.freeze({
  DEFAULT: 0,
  START: 1,
  MOVE: 2
});

const Model = ({ width = 0, slopValue = 0 } = {}) => {
  const subscribers = [];

  const state = {
    state: MODEL_STATE.DEFAULT,
    touchState: TOUCH_STATE.DEFAULT,
    handleSize: 10,
    width: width,
    slopValue: slopValue,
    initialTouchPosition: null,
    lastTouchPosition: null,
    currentXPosition: 0
  };

  function getGesturePointFromEvent(evt) {
    const point = {};

    if(evt.targetTouches) {
      point.x = evt.targetTouches[0].clientX;
      point.y = evt.targetTouches[0].clientY;
    } else {
      // Either Mouse event or Pointer Event
      point.x = evt.clientX;
      point.y = evt.clientY;
    }

    return point;
  }

  function publish() {
    subscribers.forEach(s => s({ ...state }));
  }

  function removeInitialPosition() {
    updateSwipeRestPosition();
    state.state = MODEL_STATE.DEFAULT;
    publish();
    state.initialTouchPosition = null;
  }

  function resize(width) {
    state.width = width;
    state.slopValue = state.width * (1/4);
  }

  function setInitialPosition(evt) {
    state.initialTouchPosition = getGesturePointFromEvent(evt);
    state.state = MODEL_STATE.START;
    publish();
  }

  function setLastPosition(evt) {
    state.lastTouchPosition = getGesturePointFromEvent(evt);
    state.state = MODEL_STATE.MOVE;
    publish();
  }

  function updateSwipeRestPosition() {
    var differenceInX = state.initialTouchPosition.x - state.lastTouchPosition.x;
    state.currentXPosition = state.currentXPosition - differenceInX;

    // Go to the default state and change
    var newState = TOUCH_STATE.DEFAULT;

    // Check if we need to change state to left or right based on slop value
    if(Math.abs(differenceInX) > state.slopValue) {
      if(state.touchState === TOUCH_STATE.DEFAULT) {
        if(differenceInX > 0) {
          newState = TOUCH_STATE.LEFT_SIDE;
        } else {
          newState = TOUCH_STATE.RIGHT_SIDE;
        }
      } else {
        if(state.touchState === TOUCH_STATE.LEFT_SIDE && differenceInX > 0) {
          newState = TOUCH_STATE.DEFAULT;
        } else if(state.touchState === TOUCH_STATE.RIGHT_SIDE && differenceInX < 0) {
          newState = TOUCH_STATE.DEFAULT;
        }
      }
    } else {
      newState = state.touchState;
    }

    state.touchState = newState;
  }

  return {
    currentXPosition: () => state.currentXPosition,
    initialTouchPosition: () => state.initialTouchPosition,
    lastTouchPosition: () => state.lastTouchPosition,
    removeInitialPosition: removeInitialPosition,
    resize: resize,
    setInitialPosition: setInitialPosition,
    setLastPosition: setLastPosition,
    subscribe: observer => subscribers.push(observer)
  };
};

const View = warningElement => {

  let rafPending = false;

  const onAnimFrame = model => () => {
    if(!rafPending) {
      return;
    }

    var differenceInX = model.initialTouchPosition.x - model.lastTouchPosition.x;

    var newXTransform = (model.currentXPosition - differenceInX)+'px';
    var transformStyle = 'translateX('+newXTransform+')';
    warningElement.style.webkitTransform = transformStyle;
    warningElement.style.MozTransform = transformStyle;
    warningElement.style.msTransform = transformStyle;
    warningElement.style.transform = transformStyle;

    rafPending = false;
  };

  function render(model) {
    if (model) {

      if (model.state === MODEL_STATE.START) {
        warningElement.style.transition = 'initial';
      }

      else if (model.state === MODEL_STATE.MOVE) {
        if (rafPending) {
          return;
        }

        rafPending = true;
        window.requestAnimFrame(onAnimFrame(model));
      }
      else if (model.state === MODEL_STATE.DEFAULT) {
        let currentXPosition;

        switch(model.touchState) {
          case TOUCH_STATE.DEFAULT:
            currentXPosition = 0;
            break;
          case TOUCH_STATE.LEFT_SIDE:
            currentXPosition = -(model.width - model.handleSize);
            break;
          case TOUCH_STATE.RIGHT_SIDE:
            currentXPosition = model.width - model.handleSize;
            break;
        }

        const transformStyle = 'translateX('+currentXPosition+'px)';

        warningElement.style.msTransform = transformStyle;
        warningElement.style.MozTransform = transformStyle;
        warningElement.style.webkitTransform = transformStyle;
        warningElement.style.transform = transformStyle;
        warningElement.style.transition = 'all 150ms ease-out';
      }
    }
  }

  return {
    render: render
  };
};

const handleGestureStart = model => evt => {
  evt.preventDefault();

  if(evt.touches && evt.touches.length > 1) {
    return;
  }

  if (window.PointerEvent) {
    evt.target.setPointerCapture(evt.pointerId);
  } else {
    document.addEventListener('mousemove', handleGestureMove(model), true);
    document.addEventListener('mouseup', handleGestureEnd(model), true);
  }

  model.setInitialPosition(evt);
};

const handleGestureMove = model => evt => {
  evt.preventDefault();

  if (!model.initialTouchPosition()) {
    return;
  }

  model.setLastPosition(evt);
};

const handleGestureEnd = model => evt => {
  evt.preventDefault();

  if(evt.touches && evt.touches.length > 1) {
    return;
  }

  if (window.PointerEvent) {
    evt.target.releasePointerCapture(evt.pointerId);
  } else {
    document.removeEventListener('mousemove', handleGestureMove(model), true);
    document.removeEventListener('mouseup', handleGestureEnd(model), true);
  }

  model.removeInitialPosition();
};

export default warningsSelector => {

  const warnings = document.querySelectorAll(warningsSelector);
  const modelElements = [];

  warnings.forEach(warning => {

    const view = View(warning);

    const model = Model({
      width: warning.clientWidth,
      slopValue: warning.clientWidth * (1/4)
    });

    model.subscribe(view.render);

    modelElements.push({ model, warning });

    // Check if pointer events are supported.
    if (window.PointerEvent) {
      // Chrome, IE, Edge
      warning.addEventListener('pointerdown', handleGestureStart(model), true);
      warning.addEventListener('pointermove', handleGestureMove(model), true);
      warning.addEventListener('pointerup', handleGestureEnd(model), true);
      warning.addEventListener('pointercancel', handleGestureEnd(model), true);
    } else {
      // Other browsers
      warning.addEventListener('touchstart', handleGestureStart(model), true);
      warning.addEventListener('touchmove', handleGestureMove(model), true);
      warning.addEventListener('touchend', handleGestureEnd(model), true);
      warning.addEventListener('touchcancel', handleGestureEnd(model), true);

      // Add Mouse Listener
      warning.addEventListener('mousedown', handleGestureStart(model), true);
    }
  });

  // We do this so :active pseudo classes are applied.
  window.onload = function() {
    if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
      document.body.addEventListener('touchstart', function() {}, false);
    }
  };

  window.onresize = function () {
    modelElements.forEach(({ model, warning }) =>
      model.resize(warning.clientWidth));
  };
};
