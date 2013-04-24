
///<reference path='../types.ts'/>

class Item {
	constructor(public group:Group, public execute:(test:ITest) => void, public label?:string) {
	}
}