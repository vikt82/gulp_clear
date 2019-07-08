// 'use strict';
var gulp = require('gulp');

// template
var pug = require('gulp-pug'),
    data = require('gulp-data'),
    fs = require('fs');

// Clear
var del = require('del');

// TEMPLATE
gulp.task('pug', function() {
  return gulp.src('./src/template/*.pug')
  .pipe(data(function(file) {
    return {
      data: JSON.parse(fs.readFileSync('./src/template/data/data.json', 'utf8')),
      navigation: JSON.parse(fs.readFileSync('./src/template/data/navigation.json', 'utf8'))
    }
  }))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('dev/'));
});

// Clear "DEV/" folder
gulp.task('del', function(){
  return del('./dev')
});
