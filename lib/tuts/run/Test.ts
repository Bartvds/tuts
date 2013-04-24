///<reference path='Async.ts'/>
///<reference path='../core/Item.ts'/>
///<reference path='../types.ts'/>

class Test implements ITest {

	_item:Item;
	_open:Async[] = [];
	_passed:string[] = [];
	_failed:string[] = [];
	_expecting:number = -1;
	_completed:bool = false;
	_callback:(test:Test) => void;
	_async:number = 0;

	constructor(item:Item) {
		this._item = item;
	}

	public expect(amount:number) {
		this._expecting = amount;
	}

	public run(callback:(test:Test) => void) {
		this._callback = callback;
		this._item.execute(this);

		this.check();
	}

	private check() {
		if (this._completed) {
			return;
		}
		if (this._async > 0 && this._open.length > 0)
		{
			return;
		}
		this._completed = true;
		this._callback(this);
	}

	public isTrue(a:bool, label:string) {
		this.mark(a !== true, label);
	}

	//more
	public async(label:String, seconds?:number):(error?:any) => void {
		this._async += 1;
		var async = new Async(this, label, seconds);
		this._open.push(async);
		var self:Test = this;
		return (error?:any) => {
			self.finishAsync(async)
		};
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
		this.check();
	}

	private mark(passed:bool, label:string) {
		if (passed) {
			this._passed.push(label)
		}
		else {
			this._failed.push(label)
		}
	}

	getFailedLabels():string[] {
		return this._failed.slice(0);
	}

	public isAsync():bool {
		return this._open.length > 0;
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