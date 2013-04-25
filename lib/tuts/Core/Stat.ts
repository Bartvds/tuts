///<reference path='../types.ts'/>
///<reference path='../../util/collection.ts'/>

class Stat implements IStat {

	_numTested:number = 0;
	_numExpected:number = 0;
	_numPassed:number = 0;
	_numFailed:number = 0;
	_label:string = '';

	constructor(label?:string) {
		this._label = label || '';
	}

	public add(stat:IStat) {
		this._numTested += stat.numTested();
		this._numExpected += stat.numExpected();
		this._numPassed += stat.numPassed();
		this._numFailed += stat.numFailed();
	}

	public getLabel():string {
		return this._label;
	}

	public getShort():string {
		return (this._label ? ('"' + this._label + '" ') : '') + this.hasPassed() + ' [' + [this.numMissing(), this.numFailed()].join(' ') + '] [' + [this.numPassed(), this.numTested(), this.numExpected()].join(' ') + ']';
	}

	public numExpected():number {
		return this._numExpected;
	}

	public numTested():number {
		return this._numTested;
	}

	public numPassed():number {
		return this._numPassed;
	}

	public numFailed():number {
		return this._numFailed;
	}

	public numMissing():number {
		return this._numExpected > 0 ? this._numExpected - this._numTested : 0;
	}

	public hasExpected():bool {
		return (this._numExpected > 0 && this._numTested === this._numExpected);
	}

	public hasPassed():bool {
		return this._numFailed === 0 && this.hasExpected();
	}
}