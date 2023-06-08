const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, './src'),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' }), new webpack.HotModuleReplacementPlugin()],
  // devServer: {
  //   contentBase: path.resolve(__dirname, '../../build'),
  //   publicPath: '',
  //   historyApiFallback: true,
  //   compress: true,
  //   port: 4040,
  //   noInfo: true,
  //   quiet: true,
  //   clientLogLevel: 'warning',
  //   stats: 'errors-only',
  //   open: true,
  //   hot: true,
  // },
};
