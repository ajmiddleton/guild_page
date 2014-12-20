var gulp = require('gulp');
var inject = require('gulp-inject');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var jade = require('gulp-jade');
var rimraf = require('rimraf');
var less = require('gulp-less');
var minify = require('gulp-minify');
var browserSync = require('browser-sync');
var mainBowerFiles = require('main-bower-files');
var reload = browserSync.reload;

var DEST = './dist';
var TMP = './.tmp';
var BOWER = './bower_components/**/*.{js, css}';
var MODULES = './modules/**/*.{js, css}';

gulp.task('index', ['coffee', 'jade', 'less', 'copy-vendors'], function(){
  var target = gulp.src('./app/index.html');
  var sources = mainBowerFiles({includeDev: true, paths:{bowerDirectory:'./bower_components', bowerJson: './bower.json'}});
  sources.push(MODULES);
  sources = gulp.src(sources, {read: false, cwd: DEST});

  return target
    .pipe(inject(sources))
    .pipe(gulp.dest(DEST));
});

gulp.task('coffee', function(){
  return gulp.src('./app/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(DEST));
});

gulp.task('jade', function(){
  return gulp.src('./app/**/*.jade')
    .pipe(jade({}))
    .pipe(gulp.dest(DEST));
});

gulp.task('less', function(){
  return gulp.src('./app/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(DEST));
});

gulp.task('copy-vendors', function(){
  return gulp.src(['./bower_components/**/*.js', './bower_components/**/*.css', './bower_components/**/*.map'])
    .pipe(gulp.dest(DEST + '/bower_components'));
})

gulp.task('clean-dist', function(cb){
  rimraf('./dist', cb);
});

gulp.task('reload', function(){
  reload();
});

gulp.task('serve', function(){
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('./app/modules/**/*.coffee', ['coffee', 'reload']);
  gulp.watch('./app/modules/**/*.jade', ['jade', 'reload']);
  gulp.watch('./app/modules/**/*.less', ['less', 'reload']);
});

gulp.task('build', ['clean-dist'], function(){
  //['coffee', 'jade', 'less', 'index']
  gulp.run('index');
});
