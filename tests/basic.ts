///<reference path='../lib/tuts/types.ts'/>

export function test(group:IGroup) => {

	group.add('boolean', (test:ITest) => {
		test.expect(1);
		test.isTrue(true, 'should be true');
	});
}