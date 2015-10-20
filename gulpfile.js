var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webserver = require('gulp-webserver');

gulp.task('js', function () {
    'use strict';
    gulp.src('builds/development/js/**/*');
});

gulp.task('html', function () {
    'use strict';
    gulp.src('builds/development/*.html');
});

gulp.task('css', function () {
    'use strict';
    gulp.src('builds/development/css/*.css');
});

gulp.task('watch', function () {
    'use strict';
    gulp.watch('builds/development/js/**/*', ['js']);
    gulp.watch('builds/development/css/*.css', ['css']);
    gulp.watch(['builds/development/*.html',
        'builds/development/views/*.html'], ['html']);
});

/*gulp.task('webserver', function () {
    'use strict';
    gulp.src('builds/development/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});*/

gulp.task('default', ['watch', 'html', 'js', 'css']);
