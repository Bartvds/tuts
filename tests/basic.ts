import tuts = module('../lib/tuts');

export function test(group:tuts.TestGroup) => {

	group.add('boolean', (test:tuts.Test) => {
		test.expect(1);
		test.isTrue(true, 'should be true');
	});
}