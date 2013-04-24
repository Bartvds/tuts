///<reference path='tuts/Engine.ts'/>
///<reference path='util/collection.ts'/>
///<reference path='tuts/system/System.ts'/>
///<reference path='tuts/report/LogReporter.ts'/>
///<reference path='../typings/DefinitelyTyped/requirejs/requirejs.d.ts'/>

'use strict';
declare var __dirname;
declare var require:(name:string) => any;

System.init();

var fs = require('fs');

var engine = new tuts.Engine();
engine.addReporter(new tuts.LogReporter(System.console, false, ''));

var list;

try {
	list = JSON.parse(fs.readFileSync(__dirname + '/tests/list.json'));
}
catch (e) {
	System.console.log(e);
}
if (!list || !list.list) {
	System.console.log('no list data in list.json');
}
else {
	util.eachArray(list.list, (path:string) => {

		//path = path.replace(/\.[\w-]+$/,'');

		engine.reporter.log('loading: ' + path);
		var prefix = __dirname + '/tests/';
		var mod = require(prefix + path);
		engine.addModuleGroup(path, mod);
	});
	engine.run();
}



