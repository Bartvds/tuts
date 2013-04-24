
///<reference path='../lib/tuts/types.ts'/>
///<reference path='../lib/miniapp/MiniApp.ts'/>
///<reference path='../lib/miniapp/Stepper.ts'/>


export function init(group:IGroup) => {
	group.add('stepper', (test:ITest) => {

		test.expect(2);
		var stepper = new miniapp.Stepper();

		test.isEqual(stepper.value, 0, 'starts at value 0');
		test.isEqual(stepper.step, 0, 'starts at step 0');
	});
}