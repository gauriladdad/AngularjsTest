This project takes the source of TODO MVC Angular project from https://github.com/tastejs/todomvc/tree/gh-pages/examples/angularjs-perf
and tries to add automation tests to it.

###Tools Used

1. Github
3. Node.js and NPM
4. Karma along with Jasmine
4. Protractor
5. Grunt
6. Jenkins
7. selenium


### Libraries/Components used

1. angular-mocks - AngularJS mocks for testing

2. Karma - for the purpose of running unit tests.
3. karma-jenkins-reporter - For generating Junit xml report of code coverage to be displayed in Jenkins.

4. Protractor - for the purpose of automation of end to end application tests. 
5. grunt-protractor-coverage - For code coverage of end to end automation tests in Protractor.

5. grunt - for the purpose of simplification of running unit and automation tests. It also runs correspnding taks of generating respective code coverages.
