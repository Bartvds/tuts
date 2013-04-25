///<reference path='../../typings/DefinitelyTyped/requirejs/requirejs.d.ts'/>
///<reference path='../util/collection.ts'/>
///<reference path='system/System.ts'/>
///<reference path='report/LogReporter.ts'/>
///<reference path='core/Engine.ts'/>

'use strict';
declare var __dirname;
declare var require:(name:string) => any;

System.init();

var fs = require('fs');

var engine = new Engine();
engine.addReporter(new LogReporter(System.console, false));

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
		var mod;
		try {
			mod = require(prefix + path);
		}
		catch (e) {

		}
		engine.addModuleGroup(path, mod);
	});

	engine.run((error:any, result?:IResult) => {
		System.console.log(!error && result ? (result.hasPassed() ? 'PASSED' : 'FAILED' ) : 'no result')
	});
}



