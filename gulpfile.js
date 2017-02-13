'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const cp = require('child_process');
const spawn = cp.spawn;
const browserSync = require('browser-sync');
const del = require('del');
const debug = require('gulp-debug');
const cssmin = require('gulp-cssmin');
const cleaner = require('gulp-clean');
const concat = require('gulp-concat');
const useref = require('gulp-useref');

const jekyll_command   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

const jekyll_build = (done) => {
	browserSync.notify(messages.jekyllBuild)
	return spawn(jekyll_command, ['build'], {stdio:'inherit'}).on('close', done);
}


const clean = (done) => {
	console.log("Began clean");
	return del('_site');
	//return gulp.src('_site/', {read: false})
    //    .pipe(cleaner());
};
const useref_task = () =>{
	console.log("Began useref");
	return gulp.src('_site/*.html')
		.pipe(useref())
		.pipe(gulp.dest('_site/'));
};
const css = () => {
	console.log("Began css");
	return gulp.src('_assets/css/*.css')
		.pipe(debug())
		.pipe(autoprefixer())
		.pipe(cssmin())
		.pipe(gulp.dest('_site/assets/css'));
};
const fonts = () => {
	console.log("Began fonts");
	return gulp.src('_assets/fonts/*')
		.pipe(gulp.dest('_site/assets/fonts'));
};

const js = () => {
	console.log("Began js");
	return gulp.src(['_assets/js/*.js'])
		.pipe(debug())
		.pipe(babel({
        	presets: ['es2015']
      	}))
  		//.pipe(concat('scripts.js')) //as of 2/10/17, status is 'failing' https://www.npmjs.com/package/gulp-concat
  		.pipe(uglify())
  		.pipe(gulp.dest('_site/assets/js'));
};
const reload_site = (done) => {
	console.log("Began reload");
	return (browserSync.reload() || true) && done();
};
const total_reload = () =>{
	return gulp.series( 'jekyll_build', gulp.parallel(['js', 'css', 'fonts']), 'reload_site');
}
const serve = () => {
	browserSync.init({
        server: "_site"
    });
    gulp.watch('_assets/js/*.js', total_reload());
	gulp.watch('_assets/css/*.css', total_reload());
 	gulp.watch(['*.html', '_layouts/*.html', '_sections/*', '**/*.html', '!_site/*']).on('change', total_reload());

};


gulp.task('css', css);
gulp.task('js', js);
gulp.task('fonts', fonts);
gulp.task('clean', clean);
gulp.task('jekyll_build', jekyll_build);
gulp.task('total_reload', total_reload);
gulp.task('serve', serve);
gulp.task('reload_site', reload_site);
gulp.task('useref_task', useref_task);
gulp.task('build',  gulp.series('clean', 'jekyll_build', gulp.parallel(['js', 'css', 'fonts']), 'useref_task'));
gulp.task('default', gulp.series('clean', 'jekyll_build', gulp.parallel(['js', 'css', 'fonts']), 'useref_task', 'serve'));