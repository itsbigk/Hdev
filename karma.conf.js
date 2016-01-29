var webpack = require('webpack'),
    path    = require('path');
// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig (config) {
  config.set({

    frameworks: [
      'mocha'
    ],

    reporters: [
      'spec',
      'coverage'
    ],

    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',

      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },

    browsers: [
      'PhantomJS'
    ],

    singleRun: true,

    coverageReporter: {
      dir: 'coverage/',
      type: 'html'
    },

    webpack: {
      resolve: {
        extensions: ['', '.js', '.jsx',]
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
          }
        ],
        watch: true
      }
    },

    webpackMiddleware: {
      noInfo: true
    }
  })
}
