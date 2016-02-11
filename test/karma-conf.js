module.exports = function(config){
  config.set({
    //  root path location that will be used to resolve all relative paths in files and exclude sections
    basePath : '../',

    // files to include, ordered by dependencies
    files : [
      // include relevant Angular files and libs
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      // include JS files
      'js/**/*.js',
      'js/app.js',
      // include unit test specs
      'test/unit/*.js'
    ], 
    // files to exclude
    exclude : [
       'node_modules/angular/*.min.js'
      ],

    // karma has its own autoWatch feature but Grunt watch can also do this
    autoWatch : false,

    // testing framework, be sure to install the correct karma plugin
    frameworks: ['jasmine'],

    // browsers to test against, be sure to install the correct browser launcher plugins
    browsers : ['Chrome', 'PhantomJS'],

    // map of preprocessors that is used mostly for plugins
    preprocessors: {
      // test coverage
      'js/controllers/*.js': ['coverage'],
      'js/directives/*.js': ['coverage'],
      'js/app.js': ['coverage']
    },

    reporters: ['progress', 'coverage', 'jenkins'],

    // list of karma plugins
    plugins : [
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-jasmine',
	   "karma-junit-reporter",
      'karma-phantomjs-launcher',
	  'karma-jenkins-reporter'
    ],

     coverageReporter: {
      // type of file to output, use text to output to console
      type : 'text',
      // directory where coverage results are saved
      dir: 'test/unit-coverage/' ,
      // if type is text or text-summary, you can set the file name
       file: 'coverage.txt' 
    },
	jenkinsReporter: {
    outputFile: 'test/reports/test-client-report_' + Date.now() + '.xml',
    suite: 'warehouse-web',
    classnameSuffix: 'browser-test'
	},	
})}

