'use strict';

const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
// const concat = require('gulp-concat');
const del = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');
const nodemon = require('gulp-nodemon');
const notify = require("gulp-notify");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

gulp.task('default', ['clean', 'build', 'jshint', 'watch', 'nodemon']);
gulp.task('build', ['sass', 'imagemin', 'scripts']);

gulp.task('clean', function() {
  return del([
    'app/static/css/*',
    'app/static/js/*',
    'app/static/img/*'
  ]);
});

// gulp.task('concat', function() {
//   return gulp.src('src/js/**/*.js')
//     .pipe(concat('app.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/static/js'));
// });

gulp.task('imagemin', () => {
  return gulp.src('src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('app/static/img'));
});

gulp.task('scripts', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('app/static/js'));
});

gulp.task('jshint', () => {
  return gulp
    .src([
      'app/routes/**/*.js',
      'src/js/**/*.js',
      'app/data/**/*.js',
      'test/**/*.js',
      'migrations/**/*.js',
      'seeds/**/*.js',
      'knexfile.js',
      'gulpfile.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', () => {
  return gulp
    .src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('app/static/css'));
});

gulp.task('nodemon', (callback) => {
  return nodemon({
    script: 'app/www',
    watch: ['app/app.js']
  });
});

gulp.task('watch', () => {
  gulp.watch('app/**/*.js', ['jshint']);
  gulp.watch('test/**/*.js', ['jshint']);
  gulp.watch('app/views/**/*.ejs');
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('migrations/**/*.js', ['jshint']);
  gulp.watch('seeds/**/*.js', ['jshint']);
});

// https://www.mikestreety.co.uk/blog/advanced-gulp-file
