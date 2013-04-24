///<reference path='Tuts/Runner.ts'/>
///<reference path='Tuts/Util/Util.ts'/>
///<reference path='Tuts/BrowserReporter.ts'/>
///<reference path='../typings/DefinitelyTyped/requirejs/requirejs.d.ts'/>

'use strict';

require.config({
	baseUrl: '.',
	paths: {},
	shim: {}
});
require([], () => {
	console.log('tuts.ts starting..');
	var load = ['basic.js'];

	var runner = new Tuts.Runner();

	Util.eachArray(load, (path:string) => {
		console.log('loading module: ' + path);

		require(['tests/' + path], (mod) => {
			var group = runner.getGroup(path);
			if (!mod.init) {
				console.log('missing init() on module: ' + path);
			} else if (mod.init(group)) {
				console.log('added module: ' + path);
			}
		});
	});

	runner.run(new Tuts.BrowserReporter(document.getElementById('result')));
	console.log('tuts.ts ok!');
});
