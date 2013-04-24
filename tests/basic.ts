///<reference path='../lib/Tuts/types.ts'/>

export function init(group:IGroup) => {

	group.add('boolean', (test:ITest) => {
		test.expect(1);
		test.isTrue(true, 'should be true');
	});
}