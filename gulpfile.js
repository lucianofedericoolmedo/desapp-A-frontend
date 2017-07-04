var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    gls = require('gulp-live-server'),
    clean = require('gulp-clean');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('scripts', function(){
  return gulp.src('modules/**')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist/modules'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('bowerComponents', function(){
  return gulp.src('bower_components/**')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist/bower_components'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('prepareResources', function(){
  return gulp.src('resources/**')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist/resources'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('prepareCSS', function(){
  return gulp.src('css/**')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('prepareFonts', function(){
  return gulp.src('fonts/**')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('prepareImages', function(){
  return gulp.src('images/**')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('prepareMenu', function(){
  return gulp.src('menu.html')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('prepareIndex', function(){
  return gulp.src('index.html')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('prepareBaseModuleDev', function() {
  return gulp.src(
    [
      'baseModule/**'
    ])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist/baseModule'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('prepareBaseModule', function() {
  return gulp.src(
    [
      '!baseModule/urlServer.js', // <== !
      'baseModule/**'
    ])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist/baseModule'))
    .pipe(browserSync.reload({stream:true}))
});



gulp.task('prepareServer', ['prepareBaseModule'], function() {
  console.log('En prepareServer')
  return gulp.src('baseModule/urlServerRemote.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(rename('urlServer.js'))
    .pipe(gulp.dest('dist/baseModule/'))
    .pipe(gulp.src('dist/baseModule/urlServerRemote.js'))
    .pipe(clean())
    //.pipe(gulp.src('dist/baseModule/urlServerRemote.js'))
    //.pipe(rename('dist/baseModule/urlServer.js'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('prepareApp', function(){
  return gulp.src('application.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('prepareAppRun', function(){
  return gulp.src('app.run.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('prepareConfig', function(){
  return gulp.src('config.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("modules/app/**/*.js", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
});

//'prepareServer',  ,'bowerComponents'
gulp.task('buildProd', ['scripts',  'prepareServer',
  'prepareAppRun', 'prepareMenu','prepareImages', 'prepareFonts',
  'prepareIndex', 'prepareApp', 'prepareConfig', 
  'prepareResources' ,'prepareCSS']);

gulp.task('buildDev', ['scripts', 
  'prepareBaseModuleDev', 'prepareIndex', 'prepareApp', 
  'prepareAppRun', 'prepareMenu','prepareImages', 'prepareFonts',
  'prepareConfig', 'prepareResources' ,'prepareCSS']);

gulp.task('local', [ 'buildDev'], function() {
  var server = gls.new('./server.js');
  return server.start();
});
