
///<reference path='../../lib/tuts/types.ts'/>
///<reference path='../miniapp/MiniApp.ts'/>
///<reference path='../miniapp/Stepper.ts'/>
declare var exports;


var exports = exports || {};
exports.test = (group:IGroup) => {

	group.add('stepper', (test:ITest) => {

		test.expect(2);
		var stepper = new miniapp.Stepper();

		test.isEqual(stepper.value, 0, 'starts at value 0');
		test.isEqual(stepper.step, 0, 'starts at step 0');
	});
};