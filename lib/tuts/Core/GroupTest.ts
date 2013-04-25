///<reference path='Group.ts'/>
///<reference path='../../util/collection.ts'/>
///<reference path='../types.ts'/>

class GroupTest {
	private _inStep:bool;
	private _group:Group;
	private _current:ItemTest;
	private _items:ItemTest[] = [];
	private _completed:bool;
	private _callback:(group:GroupTest) => void;

	constructor(group:Group) {
		this._group = group;
	}

	public run(callback:(group:GroupTest) => void) {
		if (this._completed) {
			throw(new Error('check but group test already marked completed:' + this._group.getLabel()));
		}
		this._callback = callback;

		util.eachArray(this._group.getItems(), (item:Item) => {
			this._items.push(new ItemTest(item));
		});
		this.step();
	}

	private itemCompleted(test:ItemTest) {
		if (!this._inStep) {
			this.step()
		}
	}

	private step() {
		var self:GroupTest = this;
		var call = (test:ItemTest) => {
			self.itemCompleted(test);
		};

		this._inStep = true;
		while (this._items.length > 0) {
			this._current = this._items.shift();

			if (!this._current.run(call)) {
				break;
			}
		}
		this._inStep = false;
		if (this._items.length == 0)
		{
			this.finish();
		}
	}

	private finish() {
		if (this._completed) {
			throw(new Error('finish but group test already marked completed:' + this._group.getLabel()));
		}
		this._completed = true;
		if (this._callback) {
			this._callback(this);
			this._callback = null;
		}
	}
}
