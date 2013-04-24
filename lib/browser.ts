///<reference path='../typings/DefinitelyTyped/requirejs/requirejs.d.ts'/>
///<reference path='tuts/Engine.ts'/>
///<reference path='tuts/util/collection.ts'/>
///<reference path='tuts/system/HTMLLogger.ts'/>
///<reference path='tuts/report/BrowserReporter.ts'/>
///<reference path='tuts/report/LogReporter.ts'/>

'use strict';

require.config({
	baseUrl: '.',
	paths: {},
	shim: {}
});
require([], () => {
	System.init();
	System.console.log('tuts.ts starting..');
	var load = ['basic.js', 'async.js'];

	document.title = Math.round(Math.random() * Math.pow(10, 4)) + ' tuts';
	var engine = new tuts.Engine();

	util.eachArray(load, (path:string) => {
		System.console.log('loading module: ' + path);

		require(['tests/' + path], (mod) => {
			var group = engine.getGroup(path);
			if (!mod.init) {
				System.console.log('missing init() on module: ' + path);
			} else if (mod.init(group)) {
				System.console.log('added module: ' + path);
			}
		});
	});
	engine.addReporter(new tuts.LogReporter(System.console));
	engine.addReporter(new tuts.LogReporter(new HTMLLogger(document.getElementById('log'))));
	engine.addReporter(new tuts.BrowserReporter(document.getElementById('result')));
	engine.run();
	System.console.log('tuts.ts ok!');
});
