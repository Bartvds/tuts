import tuts = module('../lib/tuts');

export function test(group:tuts.Group) => {
	group.add('async done', (test:tuts.Test) => {
		test.expect(1);
		var done = test.async();
		setTimeout(() => {
			test.isTrue(true, 'should be true')
			done();
		}, 500);
	});
}