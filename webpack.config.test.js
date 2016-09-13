const webpack = require('webpack'),
    path    = require('path');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
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
        loader: 'style!css?sourceMap!sass?sourceMap',
        includePaths: path.resolve(__dirname, '/node_modules/foundation-sites/scss/')
      }
    ]
  }
}
