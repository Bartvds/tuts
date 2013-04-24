
///<reference path='Test.ts'/>
///<reference path='../types.ts'/>

class Item {
	constructor(public group:Group, public execute:(test:Test) => void, public label?:string) {
	}
}