///<reference path='Stepper.ts'/>
module miniapp{
	export class MiniApp {
		stepper:miniapp.Stepper;

		constructor() {
			this.stepper = new miniapp.Stepper();
		}
	}
}