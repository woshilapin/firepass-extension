import gulp from 'gulp';
import gclean from 'gulp-clean';
import gzip from 'gulp-zip';
import gsourcemaps from 'gulp-sourcemaps';
import gwebpack from 'webpack-stream';

import webpack from 'webpack';

import webpackConfig from './webpack.config.js';

export function clean() {
	return gulp.src('dist/')
		.pipe(gclean({force: true}))
		.pipe(gulp.dest('dist/'));
}
clean.description = 'Clean directory';

export function manifest() {
	return gulp.src('manifest.json')
		.pipe(gulp.dest('dist/'));
}
manifest.description = "Copy over the manifest.json file";

export function scripts() {
	return gulp.src('src/firepass.js', {"since": gulp.lastRun(scripts)})
		.pipe(gwebpack(webpackConfig, webpack))
		.pipe(gulp.dest('dist/'));
};
scripts.description = 'Generate Javascript';

export let build = gulp.series(
	clean,
	gulp.parallel(
		scripts
	)
);
build.description = 'Build the whole project';

export let watch = gulp.series(
	build,
	function watch() {
		webpackConfig.watch = true;
		return scripts();
	}
);
watch.description = 'Activate watch mode';

export function zip() {
	return gulp.src('dist/*')
		.pipe(gzip('firepass-extension.zip'))
		.pipe(gulp.dest('./'))
}
zip.description = "Create the ZIP for the extension";

export let bundle = gulp.series(
	clean,
	gulp.parallel(
		scripts,
		manifest
	),
	zip
);
bundle.description = 'bundle the extension';

export default build;
