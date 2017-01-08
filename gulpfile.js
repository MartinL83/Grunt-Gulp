// Gulpfile
// Build and compile all SCSS and JS files.

var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

var config = {
	sassPath: './styles/scss',
	bowerDir: './bower_components',
}

// Load all dependencies
var gulp = require('gulp'),
		bower = require('gulp-bower'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		sass = require('gulp-sass'),
		minifyCSS = require('gulp-clean-css'),
		autoprefixer = require('gulp-autoprefixer'),
		watch = require('gulp-watch');

// Compile our SCSS files
gulp.task('styles', function(){
	return gulp.src('styles/scss/main.scss')
					.pipe(sass({
						includePaths: [
								'app/styles/scss/',
								config.bowerDir+'/bootstrap/scss'
						]
					}))
					.pipe(autoprefixer({
						 browsers: autoPrefixBrowserList,
						 cascade:  true
					}))
					.pipe(concat('main.css'))
					.pipe(minifyCSS())
					.pipe(gulp.dest('styles/css/'));
});

// Run default task, 'gulp' in console.
gulp.task('default',['styles'], function(){
	console.log('Running...');

	// Watch file changes.
	var watcher = gulp.watch(config.sassPath + '/**/*.scss', ['styles']);

	watcher.on('change', function(event){
		console.log('Project built')
	})
})
