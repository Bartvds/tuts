///<reference path='Async.ts'/>
///<reference path='ItemRun.ts'/>
///<reference path='../types.ts'/>

class Assert implements ITest {

	private _item:ItemRun;

	constructor(item:ItemRun) {
		this._item = item;
	}

	public expect(amount:number) {
		this._item.setExpected(amount);
	}

	public async(label:String, seconds?:number):(error?:any) => void {
		return this._item.addAsync(this, label, seconds);
	}

	//boolean
	public isTrue(a:bool, label:string):bool {
		return this._item.mark(a === true, label);
	}
	public isTrueish(a:bool, label:string):bool {
		return this._item.mark(a == true, label);
	}
	public isFalse(a:bool, label:string):bool {
		return this._item.mark(a === false, label);
	}
	public isFalsy(a:bool, label:string):bool {
		return this._item.mark(a == false, label);
	}
	//compare equal
	public isEqual(a:any, b:any, label:string):bool {
		return this._item.mark(a === b, label);
	}
	public isEqualish(a:any, b:any, label:string):bool {
		return this._item.mark(a == b, label);
	}
	public isNotEqual(a:any, b:any, label:string):bool {
		return this._item.mark(a !== b, label);
	}
	public isNotEqualish(a:any, b:any, label:string):bool {
		return this._item.mark(a != b, label);
	}
}