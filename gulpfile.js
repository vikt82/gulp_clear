// 'use strict';
var gulp = require('gulp');

// template
var pug = require('gulp-pug');

// Clear
var del = require('del');

// TEMPLATE
gulp.task('pug', function() {
  return gulp.src('src/template/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dev/'));
});

// Clear "DEV/" folder
gulp.task('del', function(){
  return del('./dev')
});
