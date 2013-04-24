
'use strict';



module.exports = function(grunt) {

	var util = require('util');
	var path = require('path');

	grunt.registerMultiTask('tuts', 'Run tuts unit tests.', function() {
		// Run test(s).
		var options = this.options({
			path:'./build/tuts.js'
		});
		options.path = path.resolve(options.path);
		//options.path = options.path.replace(/\.[\w-]+$/,'');

		grunt.log.writeln(options.path);
		var tuts = require(options.path);
	});
}