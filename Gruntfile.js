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
			browser: ['browser/tests/**/*.*']
		},
		typescript: {
			node_tuts: {
				options: {
					module: 'commonjs', //or commonjs
					target: 'es5', //or es3
					base_path: 'lib/',
					sourcemap: false
				},
				src: ['lib/node.ts'],
				dest: 'build/tuts.js'
			},
			node_tests: {
				options: {
					expand: true,
					module: 'commonjs', //or commonjs
					target: 'es5', //or es3
					base_path: 'tests/',
					sourcemap: true
				},
				src: ['tests/**/*.ts'],
				dest: 'build/tests/'
			},
			browser_tuts: {
				options: {
					module: 'amd', //or commonjs
					target: 'es5', //or es3
					base_path: 'lib/',
					sourcemap: false
				},
				src: ['lib/browser.ts'],
				dest: 'browser/js/tuts.js'
			},
			browser_tests: {
				options: {
					expand: true,
					module: 'amd', //or commonjs
					target: 'es5', //or es3
					base_path: 'tests/',
					sourcemap: false
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
		}
	});

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean', 'typescript:lib']);
	grunt.registerTask('test', ['typescript:test']);

	grunt.registerTask('browser', ['clean:browser', 'typescript:browser_tuts', 'typescript:browser_tests']);
	grunt.registerTask('node', ['clean:build', 'typescript:node_tuts', 'typescript:node_tests', 'tuts:node']);

	grunt.registerTask('server', ['browser', 'deserve:browser']);


	//link editor UI buttons
	grunt.registerTask('edit_01', ['build', 'test']);
	grunt.registerTask('edit_02', ['node']);
	grunt.registerTask('edit_03', ['browser', 'deserve_reload']);
};