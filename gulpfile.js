'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

// Clear
var del = require('del');
var zip = require('gulp-zip');

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
var flexbugs = require('postcss-flexbugs-fixes');
sass.compiler = require('node-sass');

var sourcemaps = require('gulp-sourcemaps');

// template
var pug = require('gulp-pug');
var data = require('gulp-data');
var fs = require('fs');

// Assets
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');

// Java Script
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var svgSprite = require('gulp-svg-sprites');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');

// PATH
var path = {
  style: {
    src: './src/style/style.scss',
    dev: './dev/css',
    watch: ['./src/style/**/*.{scss,sass}', './src/components/**/*.{scss,sass}']
  },
  styleBuild: {
    src: './src/style/style.scss',
    dev: './build/css'
  },
  styleBuildMin: {
    src: './src/style/style.scss',
    dev: './build/css/min'
  },
  pug: {
    src: ['./src/template/*.pug'],
    dev: './dev',
    watch: ['./src/template/*.pug', './src/components/**/*.pug']
  },
  pugBuild: {
    src: ['./src/template/*.pug'],
    dev: './build'
  },
  assets: {
    src: './src/assets/img/**/*.{jpg,jpeg,png}',
    dev: './dev/img/',
    watch: './src/assets/**/*.*'
  },
  assetsBuild: {
    src: './src/assets/img/**/*.{jpg,jpeg,png}',
    dev: './build/img/',
    watch: './src/assets/**/*.*'
  },
  svg: {
    src: './src/assets/svg/**/*.svg',
    dev: './dev/img/svg',
    watch: './src/assets/svg/**/*.svg'
  },
  script: {
    src: ['./node_modules/jquery/dist/jquery.js', './node_modules/bootstrap/dist/js/bootstrap.js', './src/assets/js/**/*.js'],
    dev: './dev/js/',
    watch: ['./node_modules/jquery/dist/jquery.js', './node_modules/bootstrap/dist/js/bootstrap.js', './src/assets/js/**/*.js']
  },
  scriptBuild: {
    src: ['./node_modules/jquery/dist/jquery.js', './node_modules/bootstrap/dist/js/bootstrap.js', './src/assets/js/**/*.js'],
    dev: './build/js/',
    watch: ['./node_modules/jquery/dist/jquery.js', './node_modules/bootstrap/dist/js/bootstrap.js', './src/assets/js/**/*.js']
  }
};

function sync() {
  browserSync.init({
    open: false,
    notify: true,
    server: './dev',
  });
}

// style
function style() {
  var plugins = [
    postcssNormalize({
      browserslist: 'last 5 versions',
      forceImport: false,
    }),
    autoprefixer('last 5 version', '> 5%'),
    rucksack(),
    mqpacker(),
    postcsspr(),
    zindex(),
    postcssFontMagician(),
    flexbugs(),
    // cssnano(),
  ];
  return gulp
    .src(path.style.src)
    .pipe(plumber())
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
      browserslist: 'last 5 versions',
      forceImport: true,
    }),
    autoprefixer('last 5 version', '> 5%'),
    rucksack(),
    mqpacker(),
    postcsspr(),
    zindex(),
    postcssFontMagician(),
    flexbugs(),
    // cssnano(),
  ];
  return (
    gulp
    .src(path.styleBuild.src)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.styleBuild.dev))
  );
}

function styleBuildMin() {
  var plugins = [
    postcssNormalize({
      browserslist: 'last 5 versions',
      forceImport: true,
    }),
    autoprefixer('last 5 version', '> 5%'),
    rucksack(),
    mqpacker(),
    postcsspr(),
    zindex(),
    postcssFontMagician(),
    flexbugs(),
    cssnano(),
  ];
  return (
    gulp
    .src(path.styleBuildMin.src)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.styleBuildMin.dev))
  );
}

// Pug
function template() {
  return gulp
    .src(path.pug.src)
    .pipe(plumber())
    .pipe(
      data(function (file) {
        return {
          data: JSON.parse(
            fs.readFileSync('./src/template/data/data.json', 'utf8')
          ),
          navigation: JSON.parse(
            fs.readFileSync('./src/template/data/navigation.json', 'utf8')
          ),
        };
      })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest(path.pug.dev))
    .pipe(browserSync.stream());
}

function templateBuild() {
  return gulp
    .src(path.pugBuild.src)
    .pipe(plumber())
    .pipe(
      data(function (file) {
        return {
          data: JSON.parse(
            fs.readFileSync('./src/template/data/data.json', 'utf8')
          ),
          navigation: JSON.parse(
            fs.readFileSync('./src/template/data/navigation.json', 'utf8')
          ),
        };
      })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest(path.pugBuild.dev))
    .pipe(browserSync.stream());
}

// Assets
function assets() {
  return gulp
    .src(path.assets.src)
    .pipe(plumber())
    .pipe(gulp.dest(path.assets.dev))
    .pipe(browserSync.stream());
}

function assetsWebp() {
  return gulp
    .src(path.assets.src)
    .pipe(plumber())
    .pipe(webp())
    .pipe(gulp.dest(path.assets.dev))
    .pipe(browserSync.stream());
}

function assetsSvg() {
  return gulp
    .src(path.svg.src)
    .pipe(plumber())
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // .pipe(cheerio({
    //   run: function ($) {
    //     $('[fill]').removeAttr('fill');
    //     $('[style]').removeAttr('style');
    //   },
    //   parserOptions: {
    //     xmlMode: true
    //   }
    // }))
    .pipe(replace('&gt;', '>'))
    .pipe(gulp.dest(path.svg.dev))
    .pipe(browserSync.stream());
}

function assetsBuild() {
  return gulp
    .src(path.assetsBuild.src)
    .pipe(plumber())
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [{
          removeViewBox: true,
        }, ],
      })
    )
    .pipe(gulp.dest(path.assetsBuild.dev));
}

function assetsWebpBuild() {
  return gulp
    .src(path.assetsBuild.src)
    .pipe(plumber())
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [{
          removeViewBox: true,
        }, ],
      })
    )
    .pipe(webp())
    .pipe(gulp.dest(path.assetsBuild.dev));
}

// Java Script
function script() {
  return gulp.src(path.script.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    // .pipe(jsmin())
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.script.dev))
    .pipe(browserSync.stream());
}

function scriptBuild() {
  return gulp.src(path.scriptBuild.src)
    .pipe(plumber())
    // .pipe(sourcemaps.init())
    .pipe(jsmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(concat('main.js'))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.scriptBuild.dev))
    .pipe(browserSync.stream());
}

// clean dev folder
function clean() {
  return del(['./dev', './build']);
}

// zip
function arch() {
  return gulp
    .src('build/**/*.*')
    .pipe(zip('build.zip'))
    .pipe(gulp.dest('.'));
}

// Watch
function watch() {
  gulp.watch(path.pug.watch, template);

  gulp.watch(path.style.watch, style);

  gulp.watch(path.assets.watch, assets);
  gulp.watch(path.assets.watch, assetsWebp);
  gulp.watch(path.svg.watch, assetsSvg);

  gulp.watch(path.script.watch, script);
  gulp.watch(path.scriptBuild.watch, scriptBuild);
}

var dev = gulp.series(
  clean,
  gulp.parallel(style, template, assets, assetsWebp, assetsSvg, script, watch, sync)
);
var build = gulp.parallel(
  styleBuild,
  styleBuildMin,
  templateBuild,
  assetsBuild,
  assetsWebpBuild,
  scriptBuild
);

exports.clean = clean;

gulp.task(arch);

exports.style = style;
exports.styleBuild = styleBuild;
exports.styleBuildMin = styleBuildMin;

exports.template = template;
exports.templateBuild = templateBuild;

exports.assets = assets;
exports.assetsWebp = assetsWebp;
exports.assetsBuild = assetsBuild;
exports.assetsWebpBuild = assetsWebpBuild;
exports.assetsSvg = assetsSvg;

exports.script = script;
exports.scriptBuild = scriptBuild;

exports.sync = sync;
exports.watch = watch;
exports.dev = dev;

exports.default = dev;
exports.build = build;