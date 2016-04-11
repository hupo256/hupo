// webpack.config.js
var webpack = require('webpack');
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin");   //单独打包css
var HtmlWebpackPlugin = require('html-webpack-plugin');  //生成匹配的hash

module.exports = {
	//入口配置	
	entry : {
		main : './index'
	},
	
	//输出配置
	output : {
		path : path.join(__dirname, 'build'),
		filename : './js/[name].[chunkhash:8].js'
	},
	
	//所要用到的插件
	plugins : [		
		// new HtmlWebpackPlugin(),   //生成匹配的hash
		new webpack.optimize.CommonsChunkPlugin('./js/common.js'),  //提取公共单元到 common.js 这个文件里
		new ExtractTextPlugin("./css/[name].[chunkhash:8].css"),     //输出的css文件名
		new HtmlWebpackPlugin({                               //根据模板插入css/js等生成最终HTML
			// favicon:'./src/img/favicon.ico',     //favicon路径
			filename:'index.html',         //生成的html存放路径，相对于 path
			template:'./src/app.html',    //html模板路径
			inject:true,       //允许插件修改哪些内容，包括head与body
			// hash:true,      //为静态资源生成hash值
			minify:{           //压缩HTML文件
				removeComments:true,        //移除HTML中的注释
				collapseWhitespace:false    //删除空白符与换行符
			}
		})
	],
	
	//加载器配置
	module : {		
		loaders: [
			{test:/\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
			// {test: /\.css$/, loaders: ['style', 'css']},
			{test: /\.scss$/, loader: "style!css!sass"},
			{test: /\.less$/, loader: "style!css!less"},
			// {test: /\.(png|jpg)$/, loader: 'url-loader?limit=1000&name=../img/[hash].[ext]'}  //小于8kb的直接转为base64
			{test: /\.(png|jpg)$/, loader: 'url-loader?limit=1000&name=../img/[hash].[ext]'}  //小于8kb的直接转为base64
			// {test : /\.(png|jpg|gif)$/,loaders : [
					// 'file?hash=sha512&digest=hex&name=[hash].[ext]',
					// 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
				// ]
			// }
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