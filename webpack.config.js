import path from 'path';

export default {
	"target": 'web',
	"context": path.resolve(__dirname, 'src/'),
	"entry": {
		"firepass": './firepass.js',
		"popup/popup": './popup/popup.jsx',
	},
	"output": {
		"path": path.resolve(__dirname, 'dist/'),
		"filename": '[name].js',
	},
	"module": {
		"rules": [
			{
				"test": /\.jsx?$/,
				"exclude": /node_modules/,
				"use": {
					"loader": 'babel-loader',
				},
			},
		],
	},
	"devtool": "inline-source-map",
};
