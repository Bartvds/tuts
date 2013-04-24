
///<reference path='../lib/tuts/types.ts'/>


export function init(group:IGroup) => {
	group.add('async done', (test:ITest) => {
		test.expect(1);
		var done = test.async('timed true');
		setTimeout(() => {
			test.isTrue(true, 'should be true')
			done();
		}, 500);
	});
}