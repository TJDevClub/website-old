'use strict';

const gulp = require('gulp');
//const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
//const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
//const runsequence = require('run-sequence');
//const del = require('del');
//const replace = require('gulp-replace');
const cp = require('child_process');
//const gutil = require('gulp-util');
/*require('child_process').spawn('cmd', ['/s', '/c', '"C:\\util\\mycmd.bat"'], { 
  windowsVerbatimArguments: true
});*/
//const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const debug = require('gulp-debug');
//const sass = require('gulp-sass');
const spawn = cp.spawn;
//const livereload = require('gulp-livereload');
//const express = require('express');
const cssmin = require('gulp-cssmin');
const cleaner = require('gulp-clean');
const jekyll_command   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
const messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};
/*const jekyll_build = () => {
    browserSync.notify('Building Jekyll');
    return cp.spawn('jekyll.bat', ['build', '--incremental'], {stdio: 'inherit'});
};*/
const jekyll_build = (done) => {
	browserSync.notify(messages.jekyllBuild)
	return spawn(jekyll_command, ['build'], {stdio:'inherit'}).on('close', done);
}

/*const jekyll_rebuild = (done) => {
	browserSync.reload();
}*/

/*const browser_sync = () => {
	browserSync({
		server: {
			baseDir: '_site'
		}
	});
};*/
/*const jekyllB = (done) => {
	console.log("jekyllB");
    return spawn(jekyll_command, ['build'], {stdio:'inherit'});
*//*
    jekyll.on('exit', function (code) {
        console.log('-- Finished Jekyll Build --')
    });
};*/

/*const serve = () => {
	console.log("serve");
    var server = express();
    server.use(express.static('_site/'));
    server.listen(4000);
};*/


/*const jekyll_build = () => { 
	console.log("jekyll")
	return cp.exec('bundle', ['jekyll', 'serve', '--incremental'], {stdio: 'inherit'});*/
	/*return cp.exec('bundle', 
        ['exec', 'jekyll', 'build', '--incremental', '--config', '_config_dev.yml', 'JEKYLL_ENV=production'], 
        {stdio: 'inherit'}).on('error', (error) => gutil.log(gutil.colors.red(error.message)));
	*//*return cp.exec('bundle', 
        ['exec', 'jekyll', 'build', '--incremental'], {stdio: 'inherit'}).on('error', (error) => gutil.log(gutil.colors.red(error.message)));
};*/
/*const jekyll_prod = (done) => {
    browserSync.notify('Production Jekyll');
    return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
        .on('close', done);
};*/
/*const jekyll_prod = (done) => {
	return cp.spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' }).on('error', (error) => gutil.log(gutil.colors.red(error.message)))
    .on('close', done);
};*/
const clean = () => {
	console.log("Began clean");
	return gulp.src('_site/', {read: false})
        .pipe(cleaner());
};

const css = () => {
	console.log("CSS");
	return gulp.src('_assets/css/*.css')
		.pipe(debug())
		//.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		//.pipe(cssnano())
		.pipe(cssmin())
		.pipe(gulp.dest('_site/assets/css'));
};

const fonts = () => {
	console.log("Fonts");
	return gulp.src('_assets/fonts/*')
		.pipe(gulp.dest('_site/assets/fonts'));
};

const js = () => {
	console.log("js");
	return gulp.src(['_assets/js/*.js'])
		.pipe(debug())
		.pipe(babel({
        	presets: ['es2015']
      	}))
  		//.pipe(concat('scripts.js')) //as of 2/10/17, status is 'failing' https://www.npmjs.com/package/gulp-concat
  		.pipe(uglify())
  		.pipe(gulp.dest('_site/assets/js'));
};
//const watch = () => {
//	gulp.parallel(['css', 'js', 'fonts']);
//	jekyll_build();
//	gulp.watch('_assets/js/*.js', gulp.series('jekyll_build', 'js', 'css', 'fonts', browserSync.reload));
//	gulp.watch('_assets/css/*.css', gulp.series('jekyll_build', 'js', 'css', 'fonts', browserSync.reload));
//	gulp.watch(['*.html', '_layouts/*.html', '_sections/*', '**/*.html', '!_site/*']).on('change', gulp.series( 'jekyll_build', 'js', 'css', 'fonts', browserSync.reload));
//};
const serve = () => {
	browserSync.init({
        server: "_site"
    });
    gulp.watch('_assets/js/*.js', gulp.series('jekyll_build', gulp.parallel(['js', 'css', 'fonts']), browserSync.reload));
	gulp.watch('_assets/css/*.css', gulp.series('jekyll_build', gulp.parallel(['js', 'css', 'fonts']), browserSync.reload));
 	gulp.watch(['*.html', '_layouts/*.html', '_sections/*', '**/*.html', '!_site/*']).on('change', gulp.series( 'jekyll_build', gulp.parallel(['js', 'css', 'fonts']), browserSync.reload));

};
//const watch = () => {
//	gulp.parallel(['css', 'js', 'fonts'])
//	jekyll_build();
//	gulp.watch('assets/js/*.js', gulp.series('js', 'jekyll-rebuild'));
//	gulp.watch(['assets/css/*.css'], gulp.series('css', 'jekyll-rebuild'));
//  	gulp.watch(['index.html', '_layouts/*.html', '_sections/*', '**/*.html'], gulp.series('jekyll-rebuild'));
//};

//gulp.task('jekyll-rebuild', jekyll_build);
//gulp.task('jekyll-production', jekyll_prod);
gulp.task('css', css);
gulp.task('js', js);
gulp.task('fonts', fonts);
gulp.task('clean', clean);
//gulp.task('watch', watch);
//gulp.task('jekyllB', jekyllB);
gulp.task('jekyll_build', jekyll_build);
//gulp.task('jekyll_rebuild', jekyll_rebuild);
//gulp.task('browser_sync', browser_sync)
//gulp.task('rebuild', gulp.series(['jekyll_build', 'jekyll_rebuild']));
//gulp.task('browser', gulp.series(['clean', 'jekyll_build', gulp.parallel(['js', 'css', 'fonts']), 'browser_sync']));
//gulp.task('watch', watch);
gulp.task('serve', serve);
//gulp.task('build', gulp.series([ gulp.parallel([ 'js', 'css']), 'jekyll-production' ]));
//gulp.task('default', ['css', 'js', 'fonts', 'jekyllB', 'serve', 'watching']);
gulp.task('default', gulp.series(['jekyll_build', gulp.parallel(['js', 'css', 'fonts']), 'serve']));
//gulp.task('default', 'watch');