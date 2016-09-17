const webpack = require('webpack'),
    path    = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'foundation-sites/scss': true,
    'cheerio': 'window'
  },
  module: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env':  {
          'BROWSER': JSON.stringify(true)
        }
      })
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '/src/components/'),
        exclude: ['/node_modules/', /\.spec\.jsx$/],
        loader: 'istanbul-instrumenter'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!sass?sourceMap'
      },
      { test: /\.json$/, loader: "json-loader"}
    ]
  }
}
