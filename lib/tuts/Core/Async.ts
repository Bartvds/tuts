
///<reference path='Test.ts'/>


class Async {
	constructor(public test:Test, public label:String, public timeout?:number) {
	}


	//TODO clear timeout
	clear() {
		this.test = null;
	}
}