'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

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
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano'),
    zindex = require('postcss-zindex'),
    postcsspr = require('postcss-pr'),
    postcssFontMagician = require('postcss-font-magician');

sass.compiler = require('node-sass');

// Clear
var del = require('del');

// ZIP
var zip = require('gulp-zip');


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
  .pipe(gulp.dest('dev/'))
  .pipe(browserSync.stream());
});

// START: Style
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
    postcsspr(),
    zindex(),
    postcssFontMagician(),
    // cssnano(),
  ];
  return gulp.src(['./src/scss/**/*.scss', './src/scss/**/*.sass'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dev/css'))
    .pipe(browserSync.stream());
});
gulp.task('sass:build', function () {
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
    postcsspr(),
    zindex(),
    postcssFontMagician(),
    cssnano(),
  ];
  return gulp.src(['./src/scss/**/*.scss', './src/scss/**/*.sass'])
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'));
});

// END: Style

// Clear "DEV/" folder
gulp.task('del', function(){
  return del(['./dev', 'archive.zip'])
});

// ZIP
gulp.task('zip', function() {
  return gulp.src('./build/**')
  .pipe(zip('archive.zip', 'modifiedTime'))
  .pipe(gulp.dest('.'))
});

gulp.task('sync', function() {

  browserSync.init({
      watch: true,
      open: false,
      notify: true,
      server: "./dev"
  });

  gulp.watch("./dev/*.*").on('change', browserSync.reload);
});



gulp.task('watch', function () {
  gulp.watch(['./src/scss/**/*.scss', './src/scss/**/*.sass'], sass);
});