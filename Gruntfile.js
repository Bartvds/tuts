module.exports = function (grunt) {
	'use strict';

	var path = require('path');
	var util = require('util');

	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-deserve');

	grunt.loadTasks('tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: ['build/**/*.*', 'build'],
			browser: ['browser/tests/**/*.*', 'browser/tests', 'browser/js/tuts.js']
		},
		typescript: {
			node_tuts: {
				options: {
					module: 'commonjs', //or commonjs
					target: 'es5', //or es3
					base_path: 'lib/'
				},
				src: ['lib/node.ts'],
				dest: 'build/tuts.js'
			},
			node_tests: {
				options: {
					expand: true,
					module: 'commonjs', //or commonjs
					target: 'es5', //or es3
					base_path: 'tests/'
				},
				src: ['tests/**/*.ts'],
				dest: 'build/tests/'
			},
			browser_tuts: {
				options: {
					module: 'amd', //or commonjs
					target: 'es5', //or es3
					base_path: 'lib/'
				},
				src: ['lib/browser.ts'],
				dest: 'browser/js/tuts.js'
			},
			browser_tests: {
				options: {
					expand: true,
					module: 'amd', //or commonjs
					target: 'es5', //or es3
					base_path: 'tests/'
				},
				src: ['tests/**/*.ts'],
				dest: 'browser/tests/'
			}
		},
		deserve: {
			browser: {
				options: {
					keepalive: true,
					port: 8080,
					base: 'browser'
				}
			}
		},
		deserve_reload: {
			browser: {}
		},
		tuts: {
			node: {
				options: {
					path: 'build/tuts.js'
				}
			}
		},
		filelist : {
			tests: {
				src: ['tests/**/*.ts'],
				options: {
					base: 'tests/',
					save: 'tests/list.json'
				}
			},
			browser_tests: {
				src: ['browser/tests/**/*.js'],
				options: {
					base: 'browser/tests',
					save: 'browser/tests/list.json'
				}
			},
			node_tests: {
				src: ['build/tests/**/*.js'],
				options: {
					base: 'build/tests',
					save: 'build/tests/list.json'
				}
			}
		}
	});

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean', 'typescript:lib']);
	grunt.registerTask('test', ['typescript:test']);

	grunt.registerTask('browser', ['clean:browser', 'typescript:browser_tuts', 'typescript:browser_tests', 'filelist:browser_tests']);
	grunt.registerTask('node', ['clean:build', 'typescript:node_tuts', 'typescript:node_tests', 'filelist:node_tests', 'tuts:node']);

	grunt.registerTask('server', ['browser', 'deserve:browser']);

	grunt.registerTask('support', []);


	//link editor UI buttons
	grunt.registerTask('edit_01', ['clean']);
	grunt.registerTask('edit_02', ['support', 'filelist:tests']);
	grunt.registerTask('edit_04', ['node']);
	grunt.registerTask('edit_05', ['browser', 'deserve_reload']);
};