///<reference path='Group.ts'/>
///<reference path='ItemTest.ts'/>
///<reference path='../../util/collection.ts'/>
///<reference path='../types.ts'/>

class GroupTest implements IGroupResult {
	private _inStep:bool;
	private _group:Group;
	private _current:ItemTest;
	private _items:ItemTest[] = [];
	private _completed:bool;
	private _reporter:IReporter;
	private _callback:(group:GroupTest) => void;

	constructor(group:Group) {
		this._group = group;
	}

	public run(reporter:IReporter, callback:(group:GroupTest) => void) {
		if (this._completed) {
			throw(new Error('check but group test already marked completed:' + this._group.getLabel()));
		}
		this._callback = callback;
		this._reporter = reporter;

		util.eachArray(this._group.getItems(), (item:Item) => {
			this._items.push(new ItemTest(item));
		});
		this.step();
	}

	private itemCompleted(test:ItemTest) {
		if (!test || test !== this._current) {
			throw(new Error('asnc item completion but not current test'));
		}
		this._current = null;
		this._reporter.testComplete(test);
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

			this._reporter.testStart(this._current);

			if (!this._current.run(call)) {
				this._inStep = false;
				//bail
				return;
			}
			this._reporter.testComplete(this._current);
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
		this._current = null;
		this._completed = true;
		if (this._callback) {
			this._callback(this);
			this._callback = null;
		}
	}

	public getLabel():string {
		return this._group.getLabel();
	}
	public getItems():IItemResult[] {
		return this._items.slice(0);
	}
}
