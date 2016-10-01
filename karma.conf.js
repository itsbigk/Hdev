module.exports = config => {
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
      'tests.webpack.js': ['webpack']
    },

    browsers: [
      'PhantomJS'
    ],

    singleRun: true,

    coverageReporter: {
      dir: 'coverage/',
      type: 'html'
    },

    webpack: require('./webpack.config.test.js'),

    webpackMiddleware: {
      noInfo: true
    }
  })
}
