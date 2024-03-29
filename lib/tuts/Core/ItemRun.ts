///<reference path='Async.ts'/>
///<reference path='Item.ts'/>
///<reference path='Assert.ts'/>
///<reference path='../types.ts'/>

class ItemRun implements IItemResult, IStatNum {

	private _item:Item;
	private _open:Async[] = [];
	private _passed:string[] = [];
	private _failed:string[] = [];
	private _expecting:number = 0;
	private _started:bool = false;
	private _finished:bool = false;
	private _callback:(test:ItemRun) => void;
	private _async:number = 0;
	private _inTest:bool = false;

	constructor(item:Item) {
		this._item = item;
	}

	public run(callback:(test:ItemRun) => void):bool {
		this._callback = callback;
		this._started = true;

		this._inTest = true;
		try {
			this._item.execute(new Assert(this));
		}
		catch(e){

		}
		this._inTest = false;

		if (this._async == 0 || this._open.length == 0) {
			this._finished = true;
			return true;
		}
		return false;
	}
	public setExpected(amount:number) {
		this._expecting = amount;
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
			this._finished = true;
			this._callback(this);
		}
	}

	public addAsync(api:Assert, label:String, seconds?:number):(error?:any) => void {
		this._async += 1;
		var async = new Async(this, label, seconds);
		this._open.push(async);
		var self:ItemRun = this;
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

	public getStat():IStat {
		return new Stat(this.getLabel()).add(this);
	}
	public getUID():string {
		return this._item.uid;
	}

	public get item():Item {
		return this._item;
	}

	public getLabel():string {
		return this._item.label;
	}

	public isAsync():bool {
		return this._async > 0;
	}

	public numTested():number {
		return this._passed.length + this._failed.length;
	}

	public numExpected():number {
		return this._expecting;
	}

	public numPassed():number {
		return this._passed.length;
	}

	public numFailed():number {
		return this._failed.length;
	}

	public numMissing():number {
		var m = this._expecting - this.numTested();
		return m > 0 ? m : 0;
	}
}