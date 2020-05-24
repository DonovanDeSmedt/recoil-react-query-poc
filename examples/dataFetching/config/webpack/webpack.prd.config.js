const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const TerserPlugin = require('terser-webpack-plugin');

const specifics = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.LoaderOptionsPlugin({
      performance: {
        hints: 'error',
      },
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            ie8: false,
            mangle: {
              safari10: true,
            },
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
            },
            output: {
              ecma: 5,
            },
          },
        }),
      ],
    }),
  ],
};

const config = merge.smart(baseConfig, specifics);

module.exports = {
  ...config,
};
