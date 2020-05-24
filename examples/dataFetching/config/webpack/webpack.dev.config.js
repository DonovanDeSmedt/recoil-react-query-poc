const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const specifics = {
  entry: [
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server'),
  ],
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

const config = merge.smart(baseConfig, specifics);

console.error(config);

module.exports = config;
