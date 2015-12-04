const gulp       = require('gulp'),
      webpack    = require('webpack-stream'),
      nodemon    = require('gulp-nodemon');

const paths = {
  react: ['./src/**/*.js', './src/**/*.jsx'],
  sass: ['./src/sass/**/*.scss']
}

gulp.task('webpack', () => {
  return gulp.src('./src/App.jsx')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', () => {
  gulp.watch(paths.react, ['webpack']);
  gulp.watch(paths.sass, ['webpack']);
});

gulp.task('nodemon', () => {
  nodemon({
    script: './index.js',
    ext: 'js'
  })
    .on('start', ['webpack', 'watch'])
    .on('change', ['watch'])
    .on('restart', () => {
      console.log('Restarted');
    });
});

gulp.task('default', ['nodemon']);
