'use strict';

/* eslint-env node */

const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
// const concat = require('gulp-concat');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
// const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');
const nodemon = require('gulp-nodemon');
// const notify = require("gulp-notify");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
// const uglify = require('gulp-uglify');

const lintable = [
  'app/**/*.js',
  'gulpfile.js',
  'knexfile.js',
  'migrations/**/*.js',
  'seeds/**/*.js',
  'src/js/**/*.js',
  'test/**/*.js',
  '!node_modules/**',
  '!app/static/**'
];

gulp.task('default', ['clean', 'build', 'eslint', 'jshint', 'watch', 'nodemon']);
gulp.task('build', ['sass', 'imagemin', 'scripts']);

gulp.task('clean', () =>
  del([
    'app/static/css/*',
    'app/static/js/*',
    'app/static/img/*'
  ])
);

// gulp.task('concat', function() {
//   return gulp.src('src/js/**/*.js')
//     .pipe(concat('app.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/static/js'));
// });

gulp.task('imagemin', () =>
  gulp
  .src('src/img/**/*')
  // .pipe(imagemin())  // only imagemin on prod
  .pipe(gulp.dest('app/static/img'))
);

gulp.task('scripts', () =>
  gulp
  .src('src/js/**/*.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  // .on('error', (error) => {
  //   console.error(error.toString()); // eslint-disable-line no-console
  // })
  // .pipe(uglify()) // only uglify/min on prod
  .pipe(gulp.dest('app/static/js'))
);

gulp.task('eslint', () =>
  gulp
  .src(lintable)
  .pipe(eslint())
  .pipe(eslint.format())
  // .on('error', (error) => {
  //   console.error(error.toString()); // eslint-disable-line no-console
  //   this.emit('end');
  // })
);

gulp.task('jshint', () => gulp
  .src(lintable)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
);

gulp.task('sass', () =>
  gulp
  .src('src/scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(autoprefixer())
  .pipe(gulp.dest('app/static/css'))
);

gulp.task('nodemon', () => nodemon({
  script: 'app/www',
  watch: ['app/app.js']
}));

gulp.task('watch', () => {
  gulp.watch([
    'app/**/*.js',
    'gulpfile.js',
    'knexfile.js',
    'migrations/**/*.js',
    'seeds/**/*.js',
    'test/**/*.js'
  ], ['jshint', 'eslint']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
});

// https://www.mikestreety.co.uk/blog/advanced-gulp-file
