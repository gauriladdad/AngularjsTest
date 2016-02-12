module.exports = function(grunt) {
  grunt.initConfig({

    karma: {
			options: {
				configFile: 'test/karma-conf.js'
			},
			unit: {
				singleRun: true
			},
			continuous: {
				background: true
			}
    },

    protractor: {
	    options: {
	      configFile: "test/protractor-conf.js", // Default config file
	      // keepAlive: true, // If false, the grunt process stops when the test fails.
	      noColor: false, // If true, protractor will not use colors in its output.
	      // debug: true,
	      args: {

	      }
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

		watch: {
      options: {
      	livereload: true
      },
      karma: {
        files: ['js/**/*.js', 'test/unit/*.js'],
        tasks: ['karma:continuous:run']
      }
      ,
      protractor: {
        files: ['js/**/*.js', 'test/endToend/*.js'],
        tasks: ['protractor:continuous']
      }
  	},

  	run: {
	    mock_server: {
	      options: {
	        wait: false
	      },
	      args: []
	    }
	  },

	connect: {
    	options: {
			port: 9000,
			hostname: 'localhost'
		},
		livereload: {
			options: {
				livereload: 35729,
				open: true,
				base: ['']
			}
		},
		test: {
			options: {
				base: ['']
			}
		},
		runtime: {
            options: {
                middleware: function (connect) {
                    return [
                        lrSnippet,
                        mountFolder(connect, 'instrumented'),
                        mountFolder(connect, '.......')
                    ];
                }
            }
        }
    },
	instrument: {
        files: ['js/*.js', 'js/**/*.js'],
        options: {
			lazy: true,
            basePath: "instrumented"
        }
    },
	protractor_coverage: {
        options: {
            keepAlive: true,
            noColor: false,
            coverageDir: 'test/coverage',
            args: {
                baseUrl: 'http://localhost:9000'
            }
        },
        local: {
            options: {
                configFile: 'test/protractor-conf.js'
            }
        }
    },
	makeReport: {
        src: 'test/coverage/*.json',
        options: {
            type: 'lcov',
            dir: 'test/coverage',
            print: 'detail'
        }
    }
  });

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-run');

	grunt.registerTask('serve', ['karma:unit:start', 'run:mock_server', 'connect:livereload:start']);
  
	grunt.registerTask('unit-test', ['karma:unit:start']);
	
	grunt.registerTask('endToend-test', ['connect:test',  'protractor:continuous']);

	grunt.registerTask('test', ['karma:unit:start', 'connect:test', 'run:mock_server','protractor:endToend']);

};