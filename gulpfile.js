'use strict';

var gulp = require('gulp');

// Clear
var del = require('del');

// style
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var postcssNormalize = require('postcss-normalize');
var autoprefixer = require('autoprefixer');
var rucksack = require('rucksack-css');
var mqpacker = require('css-mqpacker');
var postcsspr = require('postcss-pr');
var zindex = require('postcss-zindex');
var postcssFontMagician = require('postcss-font-magician');
var cssnano = require('cssnano');
sass.compiler = require('node-sass');

var sourcemaps = require('gulp-sourcemaps');

// template
var pug = require('gulp-pug');
var data = require('gulp-data');
var fs = require('fs');


// PATH
var path = {
  style: {
    src: './src/style/style.scss',
    dev: './dev/css',
    watch: './src/style/**/*.*'
  },
  styleBuild: {
    src: './src/style/style.scss',
    dev: './build/css',
  },
  pug: {
    src: ['./src/template/*.pug'],
    dev: './dev',
    watch: './src/template/**/*.*'
  }
}

// style
function style() {
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
  return gulp.src(path.style.src)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(plugins))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.style.dev));
}
function styleBuild() {
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
  return gulp.src(path.styleBuild.src)
  // .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(plugins))
  // .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.styleBuild.dev));
}

function template() {
  return gulp.src(path.pug.src)
  .pipe(data(function(file) {
    return {
      data: JSON.parse(fs.readFileSync('./src/template/data/data.json', 'utf8')),
      navigation: JSON.parse(fs.readFileSync('./src/template/data/navigation.json', 'utf8'))
    }
  }))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest(path.pug.dev))
}

// clean dev folder
function clean() {
  return del('./dev');
}

// Watch
function watch() {
  gulp.watch(path.pug.watch, template);
  gulp.watch(path.style.watch, style);
}

var dev = gulp.series(clean, gulp.parallel(style, template, watch));

exports.clean = clean;
exports.style = style;
exports.styleBuild = styleBuild;
exports.template = template;
exports.watch = watch;
exports.dev = dev;

exports.default = dev;