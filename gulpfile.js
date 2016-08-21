var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var notify=require('gulp-notify');

gulp.task('test', function() {
    return gulp.src(mainBowerFiles())
        .pipe(notify("Found file: <%= file.relative %>!"))
});