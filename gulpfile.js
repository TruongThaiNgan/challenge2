var gulp = require('gulp');
const files = {
    htmlPath: 'src/*.html',
    imgPath:'src/img/*.+(png|jpg|jpeg|gif|svg)',
    scssPath: 'src/scss/*.scss',
    jsPath: 'src/js/*.js',
    fontsPath: 'src/fonts/**/*',
};

var browserSync = require('browser-sync').create();
// npm install browser-sync --save-dev
var sourcemaps = require('gulp-sourcemaps');
// npm i gulp-sourcemaps
var sass = require('gulp-sass');
// npm install gulp-sass --save-dev

gulp.task('sass', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(browserSync.reload({
            stream:true
        }))
})

gulp.task('scss', function(){
    return gulp.src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task ('html', function(){
    return gulp.src(files.htmlPath)
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function(){
    return gulp.src(files.jsPath)
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    });
});

var imagemin = require('gulp-imagemin');
// npm install gulp-imagemin --save-dev
gulp.task('images', function(){
    return gulp.src(files.imgPath)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function(){
    return gulp.src(files.fontsPath)
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss', gulp.series(['sass', 'scss']));
    gulp.watch(files.htmlPath, gulp.series(['html']));
    gulp.watch(files.jsPath, gulp.series(['js']));
});

gulp.task('default', gulp.parallel(['browserSync', 'sass', 'scss', 'html', 'fonts', 'images'], 'watch', function(callback){
    callback;
}));