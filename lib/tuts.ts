export function eachArray(collection:any[], callback:(value:any, index:number, collection:any[]) => void, thisArg?:Object) {
	for (var i = 0, ii = collection.length; i < ii; i++) {
		if (callback.call(thisArg, collection[i], i, collection) === false) {
			return;
		}
	}
}
export function eachHash(collection:Object, callback:(value:any, key:string, collection:Object) => void, thisArg?:Object) {
	for (var key in collection) {
		if (collection.hasOwnProperty(key)) {
			if (callback.call(thisArg, collection[key], key, collection) === false) {
				return;
			}
		}
	}
}
export class Runner {

	private _groups:Group[] = [];
	private _results:GroupResult[] = [];

	constructor() {

	}

	getGroup(label:string):Group {
		var group = new Group(label);
		this._groups.push(group);
		return group;
	}

	run(callback:(result:Result) => void) {
		var result = new Result();

		eachArray(this._groups, (group:Group) => {

			eachArray(group.items, (item:Item) => {
				var test = new Test(item);
				this.items.push(test);
				item.execute(test);

				if (test.completed) {

				}
				else if (test.isAsync) {

				}
			});

		});
	}
}

export class Group {

	public items:Item[] = [];

	constructor(public label:string) {
	}

	add(label:string, execute:(test:Test) => void):Item {
		var item = new Item(execute, label);
		this.items.push(item);
		return item;
	}
}

export class Item {
	/*constructor(public execute:(test:Test) => void, public label?:string) {*/
	constructor(public execute:(test:Test) => void, public label?:string) {
	}
}

export class Result {

	constructor() {
	}

	add(group:Group) {
		var result = new GroupResult(group);
		this.groups.push(result);

	}
}
export class GroupResult {
	private items:Test[] = [];

	constructor(public group:Group) {

	}


	finish(callback:(result:Result) => void) {

	}
}

export class Async {
	constructor(public test:Test, public timeout?:number) {
	}

	clear() {
		this.test = null;
	}
}

export class Test {

	private _open:Async[];
	private _passed:TestInfo[] = [];
	private _failed:TestInfo[] = [];
	private _expecting:number = -1;
	private _tested:number = 0;
	private _completed:bool = false;

	constructor(public item:Item) {

	}

	async(seconds?:number):(error?:any) => void {
		var async = new Async(this, seconds);
		this._open.push(async);
		var that = this;
		return (error?:any) => {
			async.clear();
			var i = that._open.indexOf(async);
			if (i > -1) {
				that._open.splice(i, 1)
				that.done();
			}
		};
	}

	private done() {
		if (this._completed) {
			return true;
		}
		if (this._open.length !== 0) {
			return false;
		}
		this._completed = true;
		return true;
	}

	public expect(amount:number) {
		this._expecting = amount;
	}

	public isTrue(a:bool, label:string) {
		this.mark(a !== true, label);
	}

	private mark(passed:bool, label:string) {
		if (passed) {
			this._passed.push(new TestInfo(passed, label))
		}
		else {
			this._failed.push(new TestInfo(passed, label))
		}
	}

	public getFailedLabels():string[] {
		var arr:string[] = [];
		eachArray(this._failed, (info:TestInfo) => {
			arr.push(info.label);
		});
		return arr;
	}

	get isAsync():bool {
		return this._open.length > 0;
	}

	get expecting():number {
		return this._expecting;
	}

	get tested():number {
		return this._passed.length + this._failed.length;
	}

	get passed():bool {
		return this._failed.length === 0 && (this._expecting == -1 || this.tested === this._expecting);
	}

	get completed():bool {
		return this._completed;
	}
}
export class TestInfo {
	constructor(public passed:bool, public label:string) {

	}
}