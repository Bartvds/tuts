module.exports = function (grunt) {
	'use strict';

	var path = require('path');
	var util = require('util');

	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.loadTasks('tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: ['build/**/*.*', 'build']
		},
		typescript: {
			lib: {
				options: {
					expand: true,
					module: 'commonjs', //or commonjs
					target: 'es5', //or es3
					base_path: 'lib/',
					sourcemap: true
				},
				src: ['lib/**/*.ts'],
				dest: 'build/'
			},
			test: {
				options: {
					expand: true,
					module: 'commonjs', //or commonjs
					target: 'es5', //or es3
					base_path: 'tests/',
					sourcemap: true
				},
				src: ['tests/**/*.ts'],
				dest: 'build/tests'
			}
		},
		tuts: {
			tests: ['build/tests/**/*.js']
		}
	});

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean:build', 'typescript:lib', 'test']);
	grunt.registerTask('test', ['typescript:test', 'tuts:tests']);


	//link editor UI buttons
	grunt.registerTask('edit_01', ['build']);
	grunt.registerTask('edit_02', ['clean']);
	grunt.registerTask('edit_03', []);
};