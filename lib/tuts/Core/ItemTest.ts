///<reference path='Async.ts'/>
///<reference path='Item.ts'/>
///<reference path='TestApi.ts'/>
///<reference path='../types.ts'/>

class ItemTest {

	_item:Item;
	_test:TestApi;
	_open:Async[] = [];
	_passed:string[] = [];
	_failed:string[] = [];
	_expecting:number = -1;
	_completed:bool = false;
	_callback:(test:ItemTest) => void;
	_async:number = 0;

	constructor(item:Item) {
		this._item = item;
	}

	public run(callback:(test:ItemTest) => void):bool {
		this._callback = callback;

		this._test = new TestApi(this);
		this._item.execute(this._test);
		if (this._async == 0) {
			this._completed = true;
			return true;
		}
	}

	private finishAsync(async:Async) {
		if (this._completed) {
			throw(new Error('async finish but test already marked completed: ' + async.label));
		}
		var i = this._open.indexOf(async);
		if (i < 0) {
			throw(new Error('async not in open list: ' + async.label));
		}
		this._open.splice(i, 1);
		async.clear();

		if (this._open.length == 0) {
			this._completed = true;
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

	public get item():Item {
		return this._item;
	}

	public isAsync():bool {
		return this._async > 0;
	}

	public totalTested():number {
		return this._passed.length + this._failed.length;
	}

	public numExpecting():number {
		return this._expecting;
	}
	public numPassed():number {
		return this._passed.length;
	}
	public numFailed():number {
		return this._failed.length;
	}

	public isCompleted():bool {
		return this._completed;
	}

	public hasExpected():bool {
		return (this._expecting < 1 || this.totalTested() === this._expecting);
	}

	public hasPassed():bool {
		return this._completed && (this._failed.length == 0 && this.hasExpected());
	}
}