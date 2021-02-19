let deferredPrompt;

function addInstallHandlers() {
    window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();

    deferredPrompt = e;

    console.log(`'beforeinstallprompt' event was fired`);
  });

  window.addEventListener('appinstalled', e => {
    e.preventDefault();

    deferredPrompt = null;

    console.log('PWA was installed');
  });
}

export default addInstallHandlers;
