'use strict';

var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var notify = require("gulp-notify");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('default', ['clean', 'build', 'jshint', 'watch', 'nodemon']);
gulp.task('build', ['sass']);

gulp.task('clean', function() {
  return del([
    'app/static/css'
  ]);
});

gulp.task('concat', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/static/js'));
});

gulp.task('img', function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('app/static/img'));
});

gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('app/static/js'));
});

gulp.task('jshint', function() {
  return gulp
    .src([
      'app/routes/**/*.js',
      'app/static/js/**/*.js',
      'app/data/**/*.js',
      'test/**/*.js',
      'knexfile.js',
      'gulpfile.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function() {
  return gulp
    .src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('app/static/css'));
});

gulp.task('nodemon', function(callback) {
  return nodemon({
    script: 'app/www',
    watch: ['app/app.js']
  });
});

gulp.task('watch', function() {
  gulp.watch('app/**/*.js', ['jshint']);
  gulp.watch('test/**/*.js', ['jshint']);
  gulp.watch('app/views/**/*.ejs');
  gulp.watch('src/scss/**/*.scss', ['sass']);
});

// https://www.mikestreety.co.uk/blog/advanced-gulp-file
