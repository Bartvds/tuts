///<reference path='../lib/Tuts/Runner.ts'/>
///<reference path='../lib/Tuts/BrowserReporter.ts'/>
///<reference path='../lib/Tuts/types.ts'/>

export function init(group:IGroup) => {

	console.log('Yooooooo! ' + Math.round(Math.random() * Math.pow(10, Math.random() * 8)));

	//var runner = new Tuts.Runner();

	//var group = runner.getGroup('math');
	/*
	 group.setup(() => {

	 });*/
	group.add('inline', (test:ITest) => {
		test.expect(2);
		test.isTrue(true, 'should be true');
		test.isTrue(!false, 'should be true too');
	});
	/*
	 group.clear(() => {

	 });*/

	//runner.run(new Tuts.BrowserReporter(document.getElementById('result')));
}