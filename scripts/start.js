'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// This is used for running locally.
// if you would need to proxy a certain url, fill it in in 'proxyUrl'
const config = {
  host: '0.0.0.0',
  port: 3000,
  proxyUrl: 'http://localhost:9000',
};

// Crash on unhandled rejections
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack/webpack.dev.config.js');

const compiler = webpack(webpackConfig);
// Configure devServer
const devServer = new WebpackDevServer(compiler, {
  publicPath: webpackConfig.output.publicPath,
  contentBase: 'dist',
  stats: {
    colors: true,
    timings: true,
    chunks: true,
  },
  watchContentBase: true,
  inline: true,
  hot: true,
  open: true,
  proxy: [
    {
      context: ['/api', '/app'],
      target: config.proxyUrl,
    },
  ],
});

// Launch devServer.
devServer.listen(config.port, config.host, err => {
  if (err) {
    return chalk.red(console.log(err));
  }
  console.log(chalk.cyan('Starting the development server...\n'));
  console.log(chalk.cyan(`Listening on ${config.host}:${config.port}`));
});
['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    devServer.close();
    process.exit();
  });
});
