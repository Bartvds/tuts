///<reference path='tuts/Engine.ts'/>
///<reference path='util/collection.ts'/>
///<reference path='tuts/system/System.ts'/>
///<reference path='tuts/report/LogReporter.ts'/>
///<reference path='../typings/DefinitelyTyped/requirejs/requirejs.d.ts'/>

'use strict';
declare var __dirname;

System.init();

System.console.log('tuts.ts starting..');
var load = ['basic.js'];


var engine = new tuts.Engine();

util.eachArray(load, (path:string) => {

	//path = path.replace(/\.[\w-]+$/,'');

	System.console.log('loading module: ' + path);
	var prefix = __dirname + '/tests/';

	var mod = require(prefix + path);
	var group = engine.getGroup(path);

	if (!mod.init) {
		System.console.log('missing init() on module: ' + path);
	} else if (mod.init(group)) {
		System.console.log('added module: ' + path);
	}
});
engine.run(new tuts.LogReporter(System.console, false));

