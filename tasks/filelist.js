'use strict';

module.exports = function (grunt) {

	var util = require('util');
	var fs = require('fs');
	var path = require('path');

	grunt.registerMultiTask('filelist', 'List files', function () {
		// Run test(s).
		var options = this.options({
			save: '',
			base: ''
		});
		//options.path = options.path.replace(/\.[\w-]+$/,'');
		var done = this.async();

		var res = {};

		var list = this.filesSrc;

		if (options.base) {
			var base = path.resolve(options.base.replace(/[\/\\]*$/, '/'));
			var baseLen = base.length;
			var tmp = list;
			list = [];
			grunt.util._.each(tmp, function (p) {
				var full = path.resolve(p);

				if (full.length > baseLen) {
					if (full.substring(0, baseLen) == base) {
						list.push(full.substring(baseLen + 1).replace('\\', '/'));
						grunt.log.writeln('cut "' + p + '" to "' + list[list.length-1] + '" for base "' + base + '"');
					}
				}
			});
		}

		res.list = list;

		if (options.save) {
			grunt.log.writeln('saving to ' + options.save);
			fs.writeFile(options.save, JSON.stringify(res), function (err) {
				grunt.log.writeln('saved and done');
				grunt.log.writeln(util.inspect(res));
				done(err);
			});
		}
		else {
			grunt.log.writeln('done yo');
			grunt.log.writeln(util.inspect(res));
			done();
		}
	});
}