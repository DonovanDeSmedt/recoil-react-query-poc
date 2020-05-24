const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const PATHS = require('../paths');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: PATHS.appBuild,
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      name: false,
      chunks: 'all',
    },
    runtimeChunk: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: PATHS.appSrc,
        exclude: PATHS.appNodeModules,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [PATHS.appSrc, 'node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.appHtml,
      inject: 'body',
      title: 'MWI React template',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.AutomaticPrefetchPlugin(),
  ],
};
