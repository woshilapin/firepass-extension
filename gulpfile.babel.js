import gulp from 'gulp';
import gzip from 'gulp-zip';
import gsourcemaps from 'gulp-sourcemaps';
import gwebpack from 'webpack-stream';

import del from 'del';
import webpack from 'webpack';

import webpackConfig from './webpack.config.js';

export function clean() {
	return del([ 'dist/' ]);
}
clean.description = 'Clean directory';

export function manifest() {
	return gulp.src('manifest.json')
		.pipe(gulp.dest('dist/'));
}
manifest.description = "Copy over the manifest.json file";

export function icons() {
	return gulp.src('icons/key.svg')
		.pipe(gulp.dest('dist/icons'));
}
icons.description = "Copy over the icon of the application";

export function scripts() {
	return gulp.src('src/firepass.js', {"since": gulp.lastRun(scripts)})
		.pipe(gwebpack(webpackConfig, webpack))
		.pipe(gulp.dest('dist/'));
};
scripts.description = 'Generate Javascript';

export let build = gulp.series(
	clean,
	gulp.parallel(
		scripts,
		manifest,
		icons
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
	build,
	zip
);
bundle.description = 'bundle the extension';

export default build;
