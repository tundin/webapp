var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.svg$/,
        loaders: [ "babel", "svg-react-loader"]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader", "postcss-loader"],
      }
    ]
  },
  postcss: function() {
    return [require("autoprefixer"), require("precss"), require("lost")]
  }
}
