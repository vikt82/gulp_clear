'use strict';

var gulp = require('gulp');

// template
var pug = require('gulp-pug'),
    data = require('gulp-data'),
    fs = require('fs');

// Style
var sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    // postcss plugins
    postcssNormalize = require('postcss-normalize'),
    autoprefixer = require('autoprefixer'),
    rucksack = require('rucksack-css'),
    mqpacker = require("css-mqpacker"),
    pr = require('postcss-pr');

sass.compiler = require('node-sass');

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

// Style
gulp.task('sass', function () {
  var plugins = [
    postcssNormalize({
      "browserslist": "last 5 versions",
      forceImport: true
    }),
    autoprefixer(
      "last 5 version",
      "> 5%"
    ),
    rucksack(),
    mqpacker(),
    pr(),
  ];
  return gulp.src(['./src/scss/**/*scss', './src/scss/**/*sass'])
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dev/css'));
});

// Clear "DEV/" folder
gulp.task('del', function(){
  return del('./dev')
});
