
///<reference path='../lib/tuts/types.ts'/>

export function test(group:IGroup) => {

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