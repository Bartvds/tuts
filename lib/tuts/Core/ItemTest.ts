///<reference path='Async.ts'/>
///<reference path='Item.ts'/>
///<reference path='TestApi.ts'/>
///<reference path='../types.ts'/>

class ItemTest implements IItemResult {

	_item:Item;
	_open:Async[] = [];
	_passed:string[] = [];
	_failed:string[] = [];
	_expecting:number = -1;
	_started:bool = false;
	_finished:bool = false;
	_callback:(test:ItemTest) => void;
	_async:number = 0;
	_inTest:bool = false;

	constructor(item:Item) {
		this._item = item;
	}

	public run(callback:(test:ItemTest) => void):bool {
		this._callback = callback;
		this._started = true;

		this._inTest = true;
		this._item.execute(new TestApi(this));
		this._inTest = false;

		if (this._async == 0 || this._open.length == 0) {
			System.console.log('done sync ' + this.getLabel());
			this._finished = true;
			return true;
		}
		return false;
	}

	private finishAsync(async:Async) {
		System.console.log('finishAsync ',async);
		if (this._finished) {
			throw(new Error('async finish but test already marked completed: ' + async.label));
		}
		var i = this._open.indexOf(async);
		if (i < 0) {
			throw(new Error('async not in open list: ' + async.label));
		}
		this._open.splice(i, 1);
		async.clear();

		if (!this._inTest && this._open.length === 0) {
			System.console.log('done Async ' + this.getLabel());
			this._finished = true;
			this._callback(this);
		}
	}

	public addAsync(test:TestApi, label:String, seconds?:number):(error?:any) => void {
		this._async += 1;
		var async = new Async(this, label, seconds);
		this._open.push(async);
		var self:ItemTest = this;
		return (error?:any) => {
			self.finishAsync(async)
		};
	}

	public mark(passed:bool, label:string) {
		if (passed) {
			this._passed.push(label)
		}
		else {
			this._failed.push(label)
		}
		return passed;
	}

	getFailedLabels():string[] {
		return this._failed.slice(0);
	}

	getStat():IStat {
		return this;
	}

	public get item():Item {
		return this._item;
	}

	public getLabel():string {
		return this._item.label;
	}

	public getShort():string {
		return '"' + this.getLabel() + '" ' + this.hasPassed() + ' [' + [this.numMissing(), this.numFailed()].join(' ') + '] [' + [this.numPassed(), this.numTested(), this.numExpected()].join(' ') + ']';
	}

	public isAsync():bool {
		return this._async > 0;
	}

	public isStarted():bool {
		return this._started;
	}

	public isFinished():bool {
		return this._finished;
	}

	public numTested():number {
		return this._passed.length + this._failed.length;
	}

	public numExpected():number {
		return this._expecting > 0 ? this._expecting : 0;
	}

	public numPassed():number {
		return this._passed.length;
	}

	public numFailed():number {
		return this._failed.length;
	}

	public numMissing():number {
		return this.numExpected() - this.numTested();
	}

	public hasExpected():bool {
		return (this._expecting > 0 && this.numTested() === this._expecting);
	}

	public hasPassed():bool {
		return this._finished && this.numFailed() === 0 && this.hasExpected();
	}
}