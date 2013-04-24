
///<reference path='../lib/tuts/types.ts'/>

export function init(group:IGroup) => {

	console.log('Yooooooo! ' + Math.round(Math.random() * Math.pow(10, Math.random() * 8)));

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

}