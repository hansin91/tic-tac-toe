var gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	del = require('del');

gulp.task('clean:js', () => {
	return del('./docs/dist/js');
});

gulp.task('clean:css', () => {
	return del('./docs/dist/css');
});

gulp.task('less', [ 'clean:css' ], async () => {
	gulp
		.src('./styles/styles.less')
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(cleanCSS())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./docs/dist/css'))
		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});

gulp.task('build:js', [ 'clean:js' ], () => {
	return gulp
		.src([ './node_modules/jquery/dist/jquery.min.js', './docs/assets/js/index.js' ])
		.pipe(concat('tictactoe.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./docs/dist/js'))
		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});

gulp.task('serve', () => {
	browserSync.init({
		server: {
			baseDir: 'docs'
		}
	});
});

gulp.task('watch', [ 'less', 'build:js', 'serve' ], () => {
	gulp.watch('./styles/**/**/*.less', [ 'less' ]);
	gulp.watch('./docs/*.html', browserSync.reload);
	gulp.watch('./docs/assets/js/**/*.js', [ 'build:js' ]);
});
