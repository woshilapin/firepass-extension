import gulp from 'gulp';
import gzip from 'gulp-zip';
import gpostcss from 'gulp-postcss';
import gsourcemaps from 'gulp-sourcemaps';
import gwebpack from 'webpack-stream';

import del from 'del';
import webpack from 'webpack';
import postcssrc from 'postcss-load-config';

import postcssConfig from './postcss.config.js';
import webpackConfig from './webpack.config.js';

export function clean() {
	return del([ 'dist/' ]);
}
clean.description = 'Clean directory';

export function manifest() {
	return gulp.src('manifest.json', {"since": gulp.lastRun(manifest)})
		.pipe(gulp.dest('dist/'));
}
manifest.description = 'Copy over the manifest.json file';

export function icons() {
	return gulp.src('icons/login-16.svg')
		.pipe(gulp.dest('dist/icons'));
}
icons.description = 'Copy over the icon of the application';

export function popupIcons() {
	return gulp.src('src/popup/icons/*.svg')
		.pipe(gulp.dest('dist/popup/icons'));
}
popupIcons.description = 'Copy over the icons for the popup';

export function views() {
	return gulp.src('src/**/*.html', {"since": gulp.lastRun(views)})
		.pipe(gulp.dest('dist/'));
}
views.description = 'Copy over the HTML files';

export async function styles() {
	let config = Object.create(await postcssrc());
	return gulp.src('src/**/*.css', {"since": gulp.lastRun(styles)})
		.pipe(gsourcemaps.init())
		.pipe(gpostcss(config.plugins, config.options))
		.pipe(gsourcemaps.write('.'))
		.pipe(gulp.dest('dist/'));
}
styles.description = 'Copy over the CSS files';

export function scripts() {
	return gulp.src('src/firepass.js', {"since": gulp.lastRun(scripts)})
		.pipe(gwebpack(webpackConfig, webpack))
		.pipe(gulp.dest('dist/'));
};
scripts.description = 'Generate Javascript';

export let build = gulp.series(
	clean,
	gulp.parallel(
		views,
		styles,
		scripts,
		manifest,
		icons,
		popupIcons,
	)
);
build.description = 'Build the whole project';

export let watch = gulp.series(
	build,
	function watch() {
		gulp.watch('manifest.json', manifest);
		gulp.watch('src/**/*.html', views);
		gulp.watch('src/**/*.css', styles);
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
zip.description = 'Create the ZIP for the extension';

export let bundle = gulp.series(
	clean,
	build,
	zip
);
bundle.description = 'bundle the extension';

export default build;
