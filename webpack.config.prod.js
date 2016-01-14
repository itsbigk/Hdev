var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './src/App.jsx'
  ],
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true)
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
        {
            test: /\.(js|jsx|less)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'source-map-loader'
        }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src'),
        loader: 'babel'
      },
      {
        test: /\.less$/,
        loaders: ["style", "css?sourceMap", "less?sourceMap"]
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
