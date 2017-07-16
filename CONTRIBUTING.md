# Please Contribute!

Currently open issues are under the issues tab, and basically up for grabs.

## About the development process

### Basics

Make sure you pull before you start working, and always develop by viewing

Run `gulp` to build and run locally using browser-sync out of the `_site` directory (or run `gulp build` to just build the files).


### CSS

Make sure your css links in the head are inside the 

```html
<!-- build:css assets/css/site.min.css -->

<!-- endbuild -->
```

This is how [gulp-useref](https://www.npmjs.com/package/gulp-useref) knows to build them into one big file.

### Javascript

Indentation should be **2 spaces**. Always use semicolons, try to use ES6 variables. We use babel, so it will all get compiled down in the build.

The same applies for Javascript. Your Javascript should be inside of the

```html
<!-- build:js assets/js/main.min.js -->

<!-- endbuild -->
```
tags.

### Questions

Feel free to ask questions or raise an issue. 
