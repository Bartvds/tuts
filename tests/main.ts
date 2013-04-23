
import tuts = module('../lib/tuts');
import basic = module('basic');

var runner = new tuts.Runner();

var group = runner.getGroup('math');
/*
group.setup(() => {

});*/
group.add('inline', (test: tuts.Test) => {
	test.expect(2);
	test.isTrue(true, 'should be true');
	test.isTrue(!false, 'should be true too');
});
/*
group.clear(() => {

});*/

runner.run((result:tuts.Result) => {
	if (result.passed){

	}
});