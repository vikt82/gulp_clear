// 'use strict';
var gulp = require('gulp');

// template
var pug = require('gulp-pug');


// TEMPLATE
gulp.task('pug', function() {
  return gulp.src('src/template/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dev/'));
});