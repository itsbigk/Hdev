var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/App.jsx'
  ],
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true)
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/public`,
    publicPath: '/assets/'
  },
  devtool: 'inline-source-map',
  module: {
    preLoaders: [
        {
            test: /\.(js|jsx|scss)$/,
            exclude: [/node_modules/, /\.spec\.jsx?$/],
            loader: 'source-map-loader'
        }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /\.spec\.jsx?$/],
        include: path.join(__dirname, 'src'),
        loader: 'babel',
        query: {
          presets: ['react-hmre']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!sass?sourceMap',
        includePaths: [path.resolve(__dirname, '/node_modules/foundation-sites/scss/')]
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
