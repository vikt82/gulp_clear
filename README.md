# Gulp Clean 
---

## Установка зависимостей yarn
```
yarn add gulp del gulp-pug gulp-data fs node-sass gulp-sass gulp-sourcemaps gulp-postcss autoprefixer css-mqpacker postcss-pr postcss-normalize cssnano rucksack-css postcss-zindex postcss-font-magician browser-sync gulp-zip bemto.pug gulp-imagemin gulp-webp gulp-plumber gulp-jsmin gulp-rename gulp-concat jquery bootstrap
```

##### Структура проекта папка SRC

```
src
├── assets
│   ├── img
│   │   ├── 1.jpeg
│   │   ├── 2.png
│   │   └── img.jpeg
│   ├── js
│   │   └── js.js
│   └── svg
│       └── python-powered-w.svg
├── components
│   └── component
│       ├── component.pug
│       └── component.sass
├── style
│   ├── _base.sass
│   ├── _var.scss
│   ├── mixin
│   │   └── _mixin.scss
│   └── style.scss
└── template
    ├── clean.pug
    ├── data
    │   ├── data.json
    │   └── navigation.json
    ├── include
    │   ├── footer.pug
    │   ├── head.pug
    │   └── header.pug
    ├── index.pug
    └── mixin
        └── mixin.pug

12 directories
```

##### Структура файлов pug

head.pug
```
include ../../../node_modules/bemto.pug/bemto.pug
include ../mixin/mixin.pug

<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        block title

        block style
            //- link(rel="stylesheet", href="style.css")
        
        link(href="css/style.css", rel="stylesheet")

    block variable

    body(class= bodyClass)
        block content

        block script
            //- script(src="")
        script(src="js/main.js")
```
---------
clean.pug

```
extends include/head.pug

//- includes
include ./include/header.pug
include ./include/footer.pug

//- Components
include ../components/component/component.pug

block title 
    title Document Title

block variable
    - var bodyClass = ''
    - var pageContainerClass = 'page'

block content
    +b(class=pageContainerClass)
        +header()
        +component()
        +footer() 

```

##### Java Script
```
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
```

> Подключение JQUERY, BOOTSTRAP ./node_modules/jquery/dist/jquery.js', './node_modules/bootstrap/dist/js/bootstrap.js' 
> ЕСЛИ НЕ НУЖНО УДАЛИТЬ !!!!!!!!!!