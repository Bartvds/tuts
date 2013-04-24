///<reference path='tuts/Engine.ts'/>
///<reference path='tuts/util/collection.ts'/>
///<reference path='tuts/BrowserReporter.ts'/>
///<reference path='../typings/DefinitelyTyped/requirejs/requirejs.d.ts'/>

'use strict';

require.config({
	baseUrl: '.',
	paths: {},
	shim: {}
});
require([], () => {
	System.init();
	System.console.log('tuts.ts starting..');
	var load = ['basic.js'];

	document.title = Math.round(Math.random() * Math.pow(10, 4)) + ' tuts';
	var engine = new tuts.Engine();

	util.eachArray(load, (path:string) => {
		System.console.log('loading module: ' + path);

		require(['tests/' + path], (mod) => {
			var group = runnengineer.getGroup(path);
			if (!mod.init) {
				System.console.log('missing init() on module: ' + path);
			} else if (mod.init(group)) {
				System.console.log('added module: ' + path);
			}
		});
	});

	engine.run(new tuts.BrowserReporter(document.getElementById('result')));
	System.console.log('tuts.ts ok!');
});
