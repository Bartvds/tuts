///<reference path='tuts/Runner.ts'/>
///<reference path='tuts/util/collection.ts'/>
///<reference path='../typings/DefinitelyTyped/requirejs/requirejs.d.ts'/>
///<reference path='tuts/system/System.ts'/>

'use strict';
declare var __dirname;

System.init();

System.console.log('tuts.ts starting..');
var load = ['basic.js'];


var runner = new tuts.Runner();

util.eachArray(load, (path:string) => {

	//path = path.replace(/\.[\w-]+$/,'');

	System.console.log('loading module: ' + path);
	var prefix = __dirname + '/tests/';

	var mod = require(prefix + path);
	var group = runner.getGroup(path);

	if (!mod.init) {
		System.console.log('missing init() on module: ' + path);
	} else if (mod.init(group)) {
		System.console.log('added module: ' + path);
	}
});

//runner.run(new tuts.BrowserReporter(document.getElementById('result')));
System.console.log('tuts.ts no reporterrrrr!');

