
///<reference path='../types.ts'/>

class Group implements IGroup {

	public _items:Item[] = [];

	constructor(public label:string) {
	}

	add(label:string, execute:(test:ITest) => void) {
		var item = new Item(this, execute, label);
		this._items.push(item);
	}

	getLabel():string {
		return this.label;
	}

	getItems():Item[] {
		return this._items;
	}
}