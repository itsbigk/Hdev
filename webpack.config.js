module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'source-map-loader'
        }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
}
