'use strict';

const gulp = require('gulp');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const runsequence = require('run-sequence');
const del = require('del');
const replace = require('gulp-replace');

gulp.task('test', () => {
	console.log('hi');
});

gulp.task('clean:dist', () => {
	return del.sync('dist');
});

gulp.task('useref', () => {
	return gulp.src('site/*.html')
		.pipe(useref())
		.pipe(replace(/http:\/\/localhost:3000/g, 'https://tjdev.club'))
		.pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
	return gulp.src('dist/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('css', () => {
	return gulp.src('dist/**/*.css')
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(gulp.dest('dist'));
});

gulp.task('fonts', () => {
	return gulp.src('site/assets/fonts/**/*')
		.pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('favicon', () => {
	return gulp.src('site/favicon.ico')
		.pipe(gulp.dest('dist'));
});

gulp.task('build', () => {
	runsequence('clean:dist', 'useref', ['js', 'css', 'fonts', 'favicon']);
});