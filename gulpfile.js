'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

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

// Assets
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');


// PATH
var path = {
  style: {
    src: './src/style/style.scss',
    dev: './dev/css',
    watch: './src/style/**/*.{scss,sass}'
  },
  styleBuild: {
    src: './src/style/style.scss',
    dev: './build/css',
  },
  pug: {
    src: ['./src/template/*.pug'],
    dev: './dev',
    watch: './src/template/**/*.*'
  },
  assets: {
    src: './src/assets/img/**/*.{jpg,jpeg,png}',
    dev: './dev/img/',
    watch: './src/assets/**/*.*'
  },
  svg: {
    src: './src/assets/svg/**/*.svg',
    dev: './dev/img/svg',
    watch: './src/assets/svg/*.svg'
  }
}

function sync() {
  browserSync.init({
    open: false,
    notify: true,
    server: "./dev"
  });
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
  .pipe(gulp.dest(path.style.dev))
  .pipe(browserSync.stream());
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

// Pug
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
  .pipe(browserSync.stream());
}

// Assets
function assets() {
  return gulp.src(path.assets.src)
  .pipe(gulp.dest(path.assets.dev))
  .pipe(browserSync.stream());
}
function assetsWebp() {
  return gulp.src(path.assets.src)
  .pipe(webp())
  .pipe(gulp.dest(path.assets.dev))
  .pipe(browserSync.stream());
}

function assetsSvg() {
  return gulp.src(path.svg.src)
  .pipe(gulp.dest(path.svg.dev))
  .pipe(browserSync.stream());
}

function assetsBuild() {
  return gulp.src(path.assets.src)
  .pipe(imagemin({
    interlaced: true,
    progressive: true,
    optimizationLevel: 5,
    svgoPlugins: [
        {
            removeViewBox: true
        }
    ]
  }))
  .pipe(gulp.dest(path.assets.dev));
}
function assetsWebpBuild() {
  return gulp.src(path.assets.src)
  .pipe(imagemin({
    interlaced: true,
    progressive: true,
    optimizationLevel: 5,
    svgoPlugins: [
        {
            removeViewBox: true
        }
    ]
  }))
  .pipe(webp())
  .pipe(gulp.dest(path.assets.dev))
}

// clean dev folder
function clean() {
  return del('./dev');
}

// Watch
function watch() {
  gulp.watch(path.pug.watch, template);
  gulp.watch(path.style.watch, style);

  gulp.watch(path.assets.watch, assets);
  gulp.watch(path.assets.watch, assetsWebp);
  gulp.watch(path.svg.watch, assetsSvg);
}

var dev = gulp.series(clean, gulp.parallel(style, template, assets, assetsWebp, assetsSvg, watch, sync));

exports.clean = clean;

exports.style = style;
exports.styleBuild = styleBuild;

exports.template = template;

exports.assets = assets;
exports.assetsWebp = assetsWebp;
exports.assetsBuild = assetsBuild;
exports.assetsWebpBuild = assetsWebpBuild;
exports.assetsSvg = assetsSvg;

exports.sync = sync;
exports.watch = watch;
exports.dev = dev;

exports.default = dev;