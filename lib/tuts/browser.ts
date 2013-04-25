///<reference path='../../typings/DefinitelyTyped/requirejs/requirejs.d.ts'/>
///<reference path='../util/collection.ts'/>
///<reference path='system/HTMLLogger.ts'/>
///<reference path='report/BrowserReporter.ts'/>
///<reference path='report/LogReporter.ts'/>
///<reference path='core/Engine.ts'/>

'use strict';

require.config({
	baseUrl: '.',
	paths: {
		'text': '../components/requirejs-text/text',
		'domReady': '../components/requirejs-domReady/domReady'
	},
	shim: {}
});
require(['text!tests/list.json', 'domReady!'], (list) => {
	System.init();
	System.console.log('tuts.ts starting..');

	try {
		list = JSON.parse(list);
	}
	catch (e) {
		System.console.log(e);
		return;
	}
	if (!list || !list.list) {
		System.console.log('no list data in list.json');
		return;
	}

	document.title = 'tuts';

	var engine = new Engine();
	engine.addReporter(new LogReporter(System.console));
	engine.addReporter(new LogReporter(new HTMLLogger(document.getElementById('log')), false, ''));
	engine.addReporter(new BrowserReporter(document.getElementById('result')));

	var arr = [];

	util.eachArray(list.list, (path:string) => {
		arr.push('tests/' + path);
		engine.reporter.log('loading: ' + path);
	});
	require(arr, (...mods:any[]) => {
		util.eachArray(mods, (mod:any, i:number) => {
			engine.addModuleGroup(list.list[i], mod);
		});
		engine.run((error:any, result?:IResult) => {
			engine.reporter.log(!error && result ? (result.hasPassed() ? 'PASSED' : 'FAILED' ) : 'no result')
		});
	});
});
