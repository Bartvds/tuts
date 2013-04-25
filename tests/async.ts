
///<reference path='../lib/tuts/types.ts'/>


export function test(group:IGroup) => {
	group.add('async done', (test:ITest) => {
		test.expect(2);

		var doneA = test.async('timed true A');
		setTimeout(() => {
			test.isTrue(true, 'should be true')
			doneA();
		}, 500);

		var doneB = test.async('timed true B');
		setTimeout(() => {
			test.isTrue(!false, 'should be true too')
			doneB();
		}, 700);
	});
}