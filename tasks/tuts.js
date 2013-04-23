
'use strict';



module.exports = function(grunt) {

	var util = require('util');

	grunt.registerMultiTask('tuts', 'Run tuts unit tests.', function() {
		// Run test(s).
		grunt.log.writeln(util.inspect(this.filesSrc));
	});
}