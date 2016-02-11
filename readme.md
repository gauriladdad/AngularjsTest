This is testing of the app - https://github.com/tastejs/todomvc/tree/gh-pages/examples/angularjs-perf


selenium and protractor - installed globally

Grunt task has been set to run in following way ->
grunt karma - Karma Server with Auto Runs on File Change
for more way refer to - https://github.com/karma-runner/grunt-karma

Jasmine for writing unit tests
Karma for running the tests
Run unit tests - karma start test/karma-conf.js –single-run
autowatch in karma-conf needs to be true for tests to execute with above command. It will execute the unit tests again 
whenever the JavaScript files or unit test specs change. (similarly configured with grunt)

Grunt is a task runner that simplifies the automation of repetitive tasks. 

Protractor is an end-to-end test framework for AngularJS applications built on top of WebDriverJS. Protractor runs tests against your application running in a real browser, interacting with it as a user would.
Selenium standalone webdriver- This is what will automate the browser to run your tests.
set up a simple web server using the http-server Node package.

Run automation tests  all in separate command prompts
 npm start
webdriver-manager start
protractor test/protractor-conf.js
 
================Grunt tasks
grunt test = run unit tests and automation tests
grunt endToend-test = run automation tests 
grunt unit-test = run unit tests

==================XML report of protractor
remember it's configured to generate individual report based on time instead update the same one
-allows to maintain log of previos runs