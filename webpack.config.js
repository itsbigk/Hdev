module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
}
