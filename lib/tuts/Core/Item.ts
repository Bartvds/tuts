
///<reference path='../types.ts'/>
///<reference path='../system/System.ts'/>

class Item {

	public uid:string = System.getUID();

	constructor(public group:Group, public execute:(test:ITest) => void, public label?:string) {
	}
}