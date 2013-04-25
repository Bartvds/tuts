///<reference path='Async.ts'/>
///<reference path='ItemRun.ts'/>
///<reference path='../types.ts'/>

class TestApi implements ITest {

	private _item:ItemRun;

	constructor(item:ItemRun) {
		this._item = item;
	}

	public expect(amount:number) {
		this._item._expecting = amount;
	}

	public async(label:String, seconds?:number):(error?:any) => void {
		return this._item.addAsync(this, label, seconds);
	}

	public isEqual(a:any, b:any, label:string):bool {
		return this._item.mark(a == b, label);
	}

	public isStrictEqual(a:any, b:any, label:string):bool {
		return this._item.mark(a === b, label);
	}
	public isTrue(a:bool, label:string):bool {
		return this._item.mark(a === true, label);
	}
}