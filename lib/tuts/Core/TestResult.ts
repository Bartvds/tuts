
///<reference path='Async.ts'/>
///<reference path='Item.ts'/>
///<reference path='../types.ts'/>

class TestResult implements ITestResult {

	open:Async[] = [];
	passed:string[] = [];
	failed:string[] = [];
	expecting:number = -1;
	completed:bool = false;

	constructor(public item:Item) {

	}

	async(label:String, seconds?:number):(error?:any) => void {
		var async = new Async(this, label, seconds);
		this.open.push(async);
		var that:TestResult = this;
		return (error?:any) => {
			async.clear();
			var i = that.open.indexOf(async);
			if (i > -1) {
				that.open.splice(i, 1)
				that.done();
			}
		};
	}

	done() {
		if (this.completed) {
			return true;
		}
		if (this.open.length !== 0) {
			return false;
		}
		this.completed = true;
		return true;
	}

	mark(passed:bool, label:string) {
		if (passed) {
			this.passed.push(label)
		}
		else {
			this.failed.push(label)
		}
	}

	getFailedLabels():string[] {
		return this.failed.slice(0);
	}

	isAsync():bool {
		return this.open.length > 0;
	}

	totalTested():number {
		return this.passed.length + this.failed.length;
	}

	isError():bool {
		return this.completed && (this.failed.length >= 0 || (this.expecting >= 0 && this.totalTested() == this.expecting));
	}
}