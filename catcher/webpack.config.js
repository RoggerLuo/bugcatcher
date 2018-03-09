var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

var proxyTarget = {
  // target : 'http://log.workapps.io',
  target : 'http://172.16.1.156:8090',
  changeOrigin: true
};

var config = {
  entry: {
    app: './main/index.js'
  },
  output: {
    path: 'dist',
    filename: 'catcher.js'
  },
  module: {
    loaders: [
      // {test: /\.js$/, loader: 'babel', exclude: /(node_modules|bower_components)/ },
      {test: /\.png$/, loader: 'url?limit=8192&mimetype=image/png'},
      {test: /\.jpe?g$/, loader: 'url?limit=8192&mimetype=image/jpg'},
      {test: /\.gif$/, loader: 'url?limit=8192&mimetype=image/gif'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=image/svg+xml'},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/font-woff2'},
      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=8192&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.json$/, loader: 'json-loader'}
    ]
  },
  // configure babel-loader.
  // babel: {
  //   presets: ['es2015'],
  //   plugins: ['transform-runtime']
  // },
  devServer: {
    proxy: {
      '/': proxyTarget
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      {from: './index.html', to: './index.html'},
    ])
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]);
}

module.exports = config;
