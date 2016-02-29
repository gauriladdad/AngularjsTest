module.exports = function(grunt) {
	grunt.initConfig({
		protractor: {
			options: {
				configFile: "test/protractor-conf.js", 
				noColor: false, // If true, protractor will not use colors in its output.
				args: { }
			},
			endToend: {
				options: {
					keepAlive: false
				}
			},
			continuous: {
				options: {
					keepAlive: true
				}
			}
		},
		connect: {
			options: {
				port: 9000,
				hostname: 'localhost'
			},
			test: {
				options: {
					base: ['']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-protractor-runner');

	grunt.registerTask('test', ['connect:test' ,'protractor:endToend']);
};