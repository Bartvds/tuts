///<reference path='../lib/tuts/types.ts'/>

export function test(group:IGroup) => {

	group.add('fail one', (test:ITest) => {
		test.expect(1);
		test.isTrue(false, 'should be true');
	});
	group.add('fail two', (test:ITest) => {
		test.expect(2);
		test.isTrue(false, 'should be true');
		test.isTrue(!true, 'should be true also');
	});

	group.add('expext 0', (test:ITest) => {
	});

	group.add('pass while no expext', (test:ITest) => {
		test.isTrue(true, 'should be true');
	});
	group.add('fail while no expext', (test:ITest) => {
		test.isTrue(false, 'should be true');
	});

	group.add('missing 2', (test:ITest) => {
		test.expect(2);
	});
	group.add('missing 2 of 4', (test:ITest) => {
		test.expect(4);
		test.isTrue(false, 'should be true');
		test.isTrue(!true, 'should be true also');
	});
}