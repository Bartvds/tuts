///<reference path='Tuts/Runner.ts'/>
///<reference path='Tuts/Util/Util.ts'/>
///<reference path='../typings/DefinitelyTyped/requirejs/requirejs.d.ts'/>

'use strict';
declare var __dirname;

console.log('tuts.ts starting..');
var load = ['basic.js'];

var runner = new Tuts.Runner();

Util.eachArray(load, (path:string) => {

	//path = path.replace(/\.[\w-]+$/,'');

	console.log('loading module: ' + path);
	var prefix = __dirname + '/tests/';

	var mod = require(prefix + path);
	var group = runner.getGroup(path);
	if (!mod.init) {
		console.log('missing init() on module: ' + path);
	} else if (mod.init(group)) {
		console.log('added module: ' + path);
	}
});

//runner.run(new Tuts.BrowserReporter(document.getElementById('result')));
console.log('tuts.ts no reporterrrrr!');

