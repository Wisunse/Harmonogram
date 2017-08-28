// Karma configuration
// Generated on Tue Jun 13 2017 14:33:01 GMT+0200 (Środkowoeuropejski czas letni)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'libs/jquery-3.2.1.min.js',
        'libs/angular.js',
        'libs/angular-mocks.js',
        'libs/angular-sanitize.min.js',
        'libs/angular-ui-router.min.js',
        'libs/ui-bootstrap-tpls-2.5.0.min.js',
        'libs/ui.bootstrap.materialPicker.js',
        'app.js',
        'libs/angular-modal-service.js',
        'services/products.service.js',
        'controllers/modal/**',
        'controllers/history.controller.js',
        'controllers/**',
        'tests/test.js'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chromium'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity

      // client: {
      // captureConsole: true,
      // mocha: {
      //     bail: true
      // }
    // }

  })
};
