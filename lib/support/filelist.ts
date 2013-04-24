/**
 * Bart
 */

///<reference path='../util/collection.ts'/>
declare var require:(name:string) => any;
declare var exports:any;

var fs = require('fs');
var path = require('path');
var expose = exports || {};
var listFiles = expose.listFiles = (dir:string, callback:(err, paths?:string[]) => void) => {

	var dir = path.resolve(dir);
	var queue = [dir];
	var result = [];

	console.log([dir]);

	fs.readdir(dir, (err, files:string[]) => {
		if (err) {
			callback(err);
			return;
		}

		console.log([<any>'files', files]);

		util.eachArray(files, (file) => {
			console.log([<any>'file', file]);
		});
		callback(null, result);
	});
};