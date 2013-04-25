///<reference path='Group.ts'/>
///<reference path='ItemRun.ts'/>
///<reference path='Stat.ts'/>
///<reference path='../../util/each.ts'/>
///<reference path='../types.ts'/>

class GroupRun implements IGroupResult {
	private _inStep:bool;
	private _group:Group;
	private _active:ItemRun;
	private _queued:ItemRun[] = [];
	private _completed:ItemRun[] = [];
	private _finished:bool;
	private _reporter:IReporter;
	private _callback:(group:GroupRun) => void;

	constructor(group:Group) {
		this._group = group;
	}

	public run(reporter:IReporter, callback:(group:GroupRun) => void) {
		if (this._finished) {
			throw(new Error('check but group test already marked completed:' + this._group.getLabel()));
		}
		this._callback = callback;
		this._reporter = reporter;

		each.inArray(this._group.getItems(), (item:Item) => {
			this._queued.push(new ItemRun(item));
		});
		this.step();
	}

	private itemCompleted(test:ItemRun) {
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
		var self:GroupRun = this;
		var call = (test:ItemRun) => {
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
	public getUID():string {
		return this._group.uid;
	}

	public getStat():IStat {
		var stat:Stat = new Stat(this.getLabel())
		each.inArray(this._completed, (item:ItemRun) => {
			stat.add(item);
		});
		return stat;
	}

	public getItems():IItemResult[] {
		return this._completed.slice(0);
	}
}
