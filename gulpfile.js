var gulp         = require('gulp');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var minifyCSS    = require('gulp-minify-css');
var clean        = require('gulp-clean');
var autoprefixer = require('gulp-autoprefixer');
var sass         = require('gulp-sass');

gulp.task('concat-js', function() {
    gulp.src(
        [
         './public/scripts/libs/angular-sanitize.min.js',
         './public/scripts/libs/angular-modal-service.js',
         './public/scripts/libs/pdfmake.min.js',
         './public/scripts/libs/vfs_fonts.js',
         './public/scripts/app.js',
         './public/scripts/controllers/*.js',
         './public/scripts/controllers/modal/*.js',
         './public/scripts/filters/*.js',
         './public/scripts/services/*.js'
        ]
    )
        .pipe(concat('application.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/scripts/'));
});

gulp.task('clean-css', ['autoprefix'], function() {

    return gulp.src('./public/stylesheet/application.min.css', {read: false})
        .pipe(clean());
});

gulp.task('concat-css', ['clean-css'], function() {

    return gulp.src(['./public/stylesheet/css/*.css',
                     './public/stylesheet/libs/*.css'])
        .pipe(concat('application.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/stylesheet/'));
});

gulp.task('autoprefix', function() {

    return gulp.src('./public/stylesheet/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 7 versions']
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheet/'));
});

gulp.task('concat', [   'concat-js', 'clean-css', 'concat-css']);

gulp.task('styles', function() {

    gulp.src('./public/stylesheet/sass/*.sass')
        .pipe(autoprefixer({
            browsers: ['last 7 versions']
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheet/css/'));
});

gulp.task('watchSass', function() {
    gulp.watch('./public/stylesheet/sass/*.sass', ['styles']);
});