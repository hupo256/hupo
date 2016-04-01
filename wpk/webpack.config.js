// webpack.config.js
var path = require('path')
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry : ['./index'],
	output : {
		// path : path.join(__dirname, 'dist'),
		path : path.join(__dirname, 'src'),
		filename : 'bundle.js'
	},
	plugins : [
		// new webpack.optimize.UglifyJsPlugin({
			// compressor : {
				// warnings : false,
			// },
		// })
		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new ExtractTextPlugin("styles.css"),
	],
	module : {
		// loaders : [{
				// test : /\.css$/,
				// loaders : ['style', 'css']
			// }, {
				// test : /\.(png|jpg|gif)$/,
				// loaders : [
					// 'file?hash=sha512&digest=hex&name=[hash].[ext]',
					// 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				// ]
			// }
		// ]
		
		loaders: [
			{test:/\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
			{test: /\.scss$/, loader: "style!css!sass"},
			{test: /\.less$/, loader: "style!css!less"}
		]
	}
}