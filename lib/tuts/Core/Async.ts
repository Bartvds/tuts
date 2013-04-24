
///<reference path='Test.ts'/>


class Async {
	constructor(public test:TestResult, public label:String, public timeout?:number) {
	}

	clear() {
		this.test = null;
	}
}