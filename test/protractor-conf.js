exports.config = {
  // location of the Selenium JAR file and chromedriver, use these if you installed protractor locally
   seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.51.0.jar',
   chromeDriver: '../node_modules/protractor/selenium/chromedriver',
 
  // location of your E2E test specs
  specs: [
    '../test/endToend/*.js'
  ],
 
  // configure multiple browsers to run tests
 /* multiCapabilities: [{
    'browserName': 'firefox'
  }, {
    'browserName': 'chrome'
  }], */
 
  // or configure a single browser
  
  capabilities: {
    'browserName': 'chrome'
  },
 
 
  // url where your app is running, relative URLs are prepending with this URL
  baseUrl: 'http://localhost:9000/',
 
  // testing framework, jasmine is the default
  framework: 'jasmine2',
  
   // Options to be passed to Jasmine-node.
  onPrepare: function() {      
       var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            filePrefix: 'guitest-xmloutput-'+Date.now(),
            savePath: 'test/reports'
        }));
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};