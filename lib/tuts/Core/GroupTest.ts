///<reference path='Group.ts'/>
///<reference path='ItemTest.ts'/>
///<reference path='Stat.ts'/>
///<reference path='../../util/collection.ts'/>
///<reference path='../types.ts'/>

class GroupTest implements IGroupResult {
	private _inStep:bool;
	private _group:Group;
	private _active:ItemTest;
	private _queued:ItemTest[] = [];
	private _completed:ItemTest[] = [];
	private _finished:bool;
	private _reporter:IReporter;
	private _callback:(group:GroupTest) => void;

	constructor(group:Group) {
		this._group = group;
	}

	public run(reporter:IReporter, callback:(group:GroupTest) => void) {
		if (this._finished) {
			throw(new Error('check but group test already marked completed:' + this._group.getLabel()));
		}
		this._callback = callback;
		this._reporter = reporter;

		util.eachArray(this._group.getItems(), (item:Item) => {
			this._queued.push(new ItemTest(item));
		});
		this.step();
	}

	private itemCompleted(test:ItemTest) {
		if (!test || test !== this._active) {
			throw(new Error('asnc item completion but not current test'));
		}
		this._completed.push(this._active);
		this._reporter.testComplete(this._active);
		this._active = null;
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
		while (this._queued.length > 0) {
			this._active = this._queued.shift();

			this._reporter.testStart(this._active);

			if (!this._active.run(call)) {
				this._inStep = false;
				//bail
				return;
			}
			this._completed.push(this._active);
			this._reporter.testComplete(this._active);
			this._active = null;
		}
		this._inStep = false;
		if (this._queued.length == 0) {
			this.finish();
		}
	}

	private finish() {
		if (this._finished) {
			throw(new Error('finish but group test already marked completed:' + this._group.getLabel()));
		}
		this._active = null;
		this._finished = true;
		if (this._callback) {
			this._callback(this);
			this._callback = null;
		}
	}

	public getLabel():string {
		return this._group.getLabel();
	}

	public getStat():IStat {
		var stat:Stat = new Stat(this.getLabel())
		util.eachArray(this._completed, (item:ItemTest) => {
			stat.add(item);
		});
		return stat;
	}

	public getItems():IItemResult[] {
		return this._completed.slice(0);
	}
}
