'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('assets/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/'));
});
 
gulp.task('sass:w', function () {
  gulp.watch('assets/scss/*.scss', ['sass']);
});