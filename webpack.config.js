'use strict';
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src/app');
var STATIC_DIR = path.resolve(__dirname, 'src/static');
/*
let commonsPlugin = new webpack.optimize.CommonsChunkPlugin(
    'commons',  // Just name it
    'common.js' // Name of the output file
                // There are more options, but we don't need them yet.
);
*/
var CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
	entry: {
		background: APP_DIR + '/background.jsx',
		popup: APP_DIR + '/popup.jsx',
		content:APP_DIR+'/content.jsx',
	},
	output: {
		path: BUILD_DIR,
		filename: '[name]-bundle.js'
	},
	plugins: [ //commonsPlugin,
		new CopyWebpackPlugin([
            { from: STATIC_DIR }
        ]),
        new webpack.ProvidePlugin({
   			$: "jquery",
   			jQuery: "jquery"
  		})
	],
	debug: true,
	devtool: "#eval-source-map",
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				include: APP_DIR,
				loader: 'babel'
			}
		]
	}

};
module.exports = config;