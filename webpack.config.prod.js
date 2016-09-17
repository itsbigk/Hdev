const webpack = require('webpack'),
      path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      ManifestPlugin = require('webpack-manifest-plugin'),
      ChunkManifestPlugin = require('chunk-manifest-webpack-plugin'),
      WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
  entry: {
    bundle: './src/App.jsx',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk'
    ]
  },
  externals: {
    'foundation-sites/scss': true
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.DefinePlugin({
      'process.env':  {
        'NODE_ENV': JSON.stringify('production'),
        'BROWSER': JSON.stringify(true)
      }
    }),
    new ExtractTextPlugin('bundle.[chunkhash].css', { allChunks: false })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  output: {
    path: `${__dirname}/dist/ui`,
    filename: '[name].[chunkhash].min.js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /\.spec\.jsx?$/],
        include: path.join(__dirname, 'src'),
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      { test: /\.gif$/, loader: "url-loader?limit=10000&mimetype=image/gif" },
      { test: /\.jpg$/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
      { test: /\.png$/, loader: "url-loader?limit=10000&mimetype=image/png" },
      { test: /\.svg/, loader: "url-loader?limit=26000&mimetype=image/svg+xml" },
      { test: /\.(woff|woff2|ttf|eot)/, loader: "url-loader?limit=1" },
      { test: /\.json$/, loader: "json-loader"}
    ]
  }
}
