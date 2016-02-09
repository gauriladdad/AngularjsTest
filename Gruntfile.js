module.exports = function(grunt) {
	grunt.initConfig({
		karma: {
			unit: {
			    configFile: 'test/karma-conf.js',
			    autoWatch: true
			    //Setting the autoWatch option to true will instruct karma to start a 
			    //server and watch for changes to files, running tests automatically
			}
		}
	});

	grunt.loadNpmTasks('grunt-karma');
};