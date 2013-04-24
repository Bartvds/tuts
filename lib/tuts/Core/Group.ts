///<reference path='Test.ts'/>
///<reference path='Item.ts'/>
///<reference path='../types.ts'/>

class Group implements IGroup {

	public _items:Item[] = [];

	constructor(public label:string) {
	}

	add(label:string, execute:(test:Test) => void) {
		var item = new Item(this, execute, label);
		this._items.push(item);
	}

	getItems():Item[] {
		return this._items;
	}
}