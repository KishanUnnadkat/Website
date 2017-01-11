var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
var minifyJS = require('gulp-minify');
const imagemin = require('gulp-imagemin');



gulp.task('babelifyJS', () => {
	gulp.src('public/js/app.js')
	.pipe(babel({
		presets: ['es2016']
	}))
	.pipe(gulp.dest('build/js'));
});
gulp.task('minifyJS', function() {
	return gulp.src('public/js/*.js')
	.pipe(minifyJS())
	.on('error', errorHandler)
	.pipe(gulp.dest('build/js'));
});
gulp.task('minifyCSS', function() {
	gulp.src('public/css/*.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('build/css'));
});
gulp.task('minifyHTML', function() {
  return gulp.src('public/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/html'));
});
gulp.task('minifyIndexPage', function() {
  return gulp.src('public/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'));
});
gulp.task('minifyImages', function() {
	gulp.src('public/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('build/images'))
});
gulp.task('copyJS', function() {
	return gulp.src('public/js/*.js')
	.pipe(gulp.dest('build/js'));
});



gulp.task('default', ['babelifyJS', 'minifyJS', 'minifyCSS', 'minifyHTML', 'minifyIndexPage', 'minifyImages'], function() {});

// gulp.task('default', ['copyJS', 'minifyCSS', 'minifyHTML', 'minifyIndexPage', 'minifyImages'], function() {});


// Handle the error
function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}
