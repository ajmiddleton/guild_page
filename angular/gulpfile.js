var gulp = require('gulp');
var inject = require('gulp-inject');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var rimraf = require('rimraf');
var less = require('gulp-less');

var DEST = './dist';
var TMP = './.tmp';
var BOWER = './bower_components/**/*.{js, css}';

gulp.task('index', ['coffee', 'jade', 'less'], function(){
  var target = gulp.src('./app/index.html');
  var sources = gulp.src([DEST + '/**/*.js', DEST + '/**/*.css', BOWER], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest(DEST));
});

gulp.task('coffee', ['clean-dist'], function(){
  return gulp.src('./app/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(DEST))
});

gulp.task('jade', ['clean-dist'], function(){
  return gulp.src('./app/**/*.jade')
    .pipe(jade({}))
    .pipe(gulp.dest(DEST));
});

gulp.task('less', ['clean-dist'], function(){
  return gulp.src('./app/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(DEST));
});

gulp.task('clean-dist', function(cb){
  rimraf('./dist', cb);
});

gulp.task('default', ['clean-dist', 'coffee', 'jade', 'less', 'index']);
