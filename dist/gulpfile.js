const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

gulp.task('nodemon', cb => {

	var started = false;

	return nodemon({
		script: 'server.js'
	})
  .on('start', () => {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('browser-sync', gulp.series('nodemon',
  () => {
    browserSync.init(null, {
      proxy: "http://localhost:3000",
          files: ['./*.html', './js/*.js', './server.js', './css/*.css'],
          browser: ['google chrome', 'safari'],
          port: 7000
    });
  })
);

gulp.task('watch', gulp.series('browser-sync'));
