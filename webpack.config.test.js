var webpack = require('webpack'),
    path    = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  devtool: 'inline-source-map',
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, '/src/components/'),
        exclude: ['/node_modules/', /\.spec\.jsx$/],
        loader: 'istanbul-instrumenter'
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel']
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"],
        includePaths: [path.resolve(__dirname, '/node_modules/foundation-sites/scss/')]
      }
    ]
  }
}
