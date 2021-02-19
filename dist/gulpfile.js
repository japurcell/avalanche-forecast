const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const rollup = require('rollup');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

gulp.task('rollup', () =>
  rollup.rollup({
    input: 'js/app.js',
    plugins: [ nodeResolve() ]
  })
  .then(bundle => bundle.write({
    output: {
      file: 'js/bundle.js',
      format: 'esm'
    }
  })));

gulp.task('watch', () => {

  browserSync.init({
    browser: ['google chrome', 'safari'],
    middleware: [
      function (req, res, next) {
        res.setHeader('Cache-Control', 'no-cache');
        return next();
      }
    ],
    server: './'
  });

  gulp.watch(
    ['./js/**/*.js'],
    {
      ignoreInitial: false,
      ignored: ['./js/bundle.js', './js/vendor/**/*']
    },
    gulp.series('rollup'))
    .on('change', browserSync.reload);
});
