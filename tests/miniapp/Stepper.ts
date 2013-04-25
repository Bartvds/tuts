module miniapp{

	export class Stepper {

		value:number = 0;
		step:number = 1;

		constructor(step?:number) {
			if (arguments.length > 0) {
				this.step = step;
			}
		}

		reset() {
			this.value = 0;
		}

		next():number {
			this.value += this.step;
			return this.value;
		}
	}
}