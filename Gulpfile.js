var gulp = require('gulp'),
	sass = require('gulp-sass'),
    fileinclude = require('gulp-file-include'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
    cache = require('gulp-cache'),
	notify = require('gulp-notify');

// super easy include system to be able to get template files
// usage: @@include('filename.html') in source file
// gulp task will generate final file at the root folder
gulp.task('fileinclude', function() {
    gulp.src(['src/enterprise.html', 'src/runtime.html', 'src/monitoring.html'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
    return gulp.src('assets/scss/styles.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('assets/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('assets/js/*.js')
		.pipe(concat('all.js'))
        .pipe(gulp.dest('assets/js'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js'))
        .pipe(notify({ message: 'Scripts task complete'}));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('assets/scss/**/*.scss', ['styles']);
    gulp.watch('assets/js/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts']);