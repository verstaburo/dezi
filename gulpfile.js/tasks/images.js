const gulp = require('gulp');
const plumber = require('gulp-plumber');
const errorHandler = require('gulp-plumber-error-handler');
const imagemin = require('gulp-imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const changed = require('gulp-changed');
// const pngquant = require('imagemin-pngquant');
// const mozjpeg = require('imagemin-mozjpeg');

module.exports = () => (
  gulp.src('app/static/images/**/*')
  .pipe(plumber({
    errorHandler: errorHandler('Error in icons task'),
  }))
  .pipe(changed('dist/assets/images'))
  .pipe(imagemin([
    imageminJpegtran({
      quality: 80,
      progressive: true,
    }),
    imagemin.gifsicle(),
    imagemin.optipng(),
    imagemin.svgo({
      plugins: [{
        removeViewBox: false,
      }],
    }),
  ], {
    verbose: true,
  }))
  .pipe(gulp.dest('dist/assets/images'))
);
