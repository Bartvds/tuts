
///<reference path='Test.ts'/>
///<reference path='Group.ts'/>
///<reference path='Result.ts'/>

class GroupResult {
	private items:Test[] = [];

	constructor(public group:Group) {

	}

	finish(callback:(result:Result) => void) {

	}
}
