// webpack.config.js
var webpack = require('webpack');
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin");   //单独打包css

module.exports = {
	//入口配置
	entry : ['./index'],
	
	//输出配置
	output : {
		path : path.join(__dirname, 'src'),
		filename : 'bundle'
	},
	
	//所要用到的插件
	plugins : [		
		new webpack.optimize.CommonsChunkPlugin('common.js'),   //提取公共单元
		new ExtractTextPlugin("style.css")   //输出的css文件名
	],
	
	//加载器配置
	module : {		
		loaders: [
			{test:/\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
			{test: /\.scss$/, loader: "style!css!sass"},
			{test: /\.less$/, loader: "style!css!less"},
			{test : /\.(png|jpg|gif)$/,loaders : [
					'file?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			}
		]
	},
	
	//其它解决方案配置
    resolve: {
        // root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
}