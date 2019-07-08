# Gulp Clean 
---

## Pug (ex Jade)
```
npm install --save-dev gulp del gulp-pug gulp-data fs node-sass gulp-sass gulp-sourcemaps gulp-postcss autoprefixer css-mqpacker postcss-pr postcss-normalize
```
- ### Pug (ex Jade) -- bemto
```
npm i bemto.pug --save
```
``` 
src
└── template
    ├── include
    │   ├── footer.pug
    │   ├── head.pug
    │   └── header.pug
    ├── index.pug
    └── mixin
        └── mixin.pug
```
### head.pug
```
include ../../../node_modules/bemto.pug/bemto.pug

<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        block title

        block style
            link(rel="stylesheet", href="style.css")

    block variable

    body(class= bodyClass)
        block content

        block script
            script(src="js/main.js")
```
### index.pug

```
extends include/head.pug
//- includes
include ./include/header.pug
include ./include/footer.pug

block title 
    title Document Title

block variable
    - var bodyClass = ''
    - var pageContainerClass = 'page'

block content
    +b(class=pageContainerClass)
        +header()
        
        +link('### PROJECT ###')

        +footer()
```