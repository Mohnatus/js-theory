const gulp = require('gulp'),
      pug = require('gulp-pug'),
      browserSync = require('browser-sync');

const reload = browserSync.reload;


gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
});

gulp.task('pug', function() {
  gulp.src('./pug/index.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('./dist'))
    .pipe(reload({ stream: true }))
});

gulp.task('watcher', function() {
  gulp.watch('./pug/**/*.pug', (event, sb) => {
    gulp.start('pug');
  });
});

gulp.task('default', ['watcher', 'browser-sync', 'pug']);

