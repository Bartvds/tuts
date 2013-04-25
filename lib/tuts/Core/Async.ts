
///<reference path='ItemTest.ts'/>


class Async {
	constructor(public test:ItemTest, public label:String, public timeout?:number) {
	}


	//TODO clear timeout etc
	clear() {
		this.test = null;
	}
}