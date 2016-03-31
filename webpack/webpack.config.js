// webpack.config.js
module.exports = {
  entry: './src/js/main.js',
  output: {
    path: './build', // This is where images AND js will go
    publicPath: 'https://www.dianrong.com/landing/wp-content/uploads/2016/01/', // This is used to generate URLs to e.g. images
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  }
};