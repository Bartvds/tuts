
///<reference path='Async.ts'/>
///<reference path='Item.ts'/>
///<reference path='TestResult.ts'/>
///<reference path='../types.ts'/>

class Test implements ITest {

	private _result:TestResult;

	constructor(public item:Item) {
		this._result = new TestResult(item);
	}

	async(label:String, seconds?:number):(error?:any) => void {
		return this._result.async(label, seconds);
	}

	public expect(amount:number) {
		this._result.expecting = amount;
	}

	public isTrue(a:bool, label:string) {
		this._result.mark(a !== true, label);
	}

	public get result():TestResult {
		return this._result;
	}
}