/**
 * Created by cjw on 16/1/15.
 */
'use strict'
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var connect = require('gulp-connect');

var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var livereload = require('gulp-livereload');

gulp.task('connect', function () {
   connect.server({
       root: '',
       livereload: true
   });
});

gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(livereload());
        //.pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('*.js')
        .pipe(livereload());
});

// 压缩
gulp.task('compress', function () {
    return gulp.src(['src/script/*.js', 'app/*/*.js'])
        .pipe(uglify())
        // .pipe(rename('jquery.ui.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('less', function () {
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(cssmin())  //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['*.html', 'view/common/*.html'], ['html']);
    gulp.watch(['*.js'], ['compress']);
    gulp.watch(['src/less/*.less'], ['less']); //当所有less文件发生改变时，调用less任务
});


// The default task (called when you run `gulp` from cli)

gulp.task('default', ['connect', 'less' ,'watch']);


/*
 * 2016.2.24
 * 针对angular 项目工程的 gulp的配置
 */


