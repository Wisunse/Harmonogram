var gulp         = require('gulp');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');

gulp.task('concat-js', function() {
    gulp.src(
        [
         './public/scripts/dev/app.js',
         './public/scripts/dev/controllers/*.js',
         './public/scripts/dev/directives/*.js',
         './public/scripts/dev/services/*.js'
        ]
    )
        .pipe(concat('application.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/scripts/'));
});

gulp.task('concat', ['concat-js']);