
///<reference path='ItemRun.ts'/>


class Async {
	constructor(public test:ItemRun, public label:String, public timeout?:number) {
	}


	//TODO clear timeout etc
	clear() {
		this.test = null;
	}
}