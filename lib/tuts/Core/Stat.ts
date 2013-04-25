///<reference path='../types.ts'/>
///<reference path='../../util/collection.ts'/>

class Stat implements IStat {

	private _numTested:number = 0;
	private _numExpected:number = 0;
	private _numPassed:number = 0;
	private _numFailed:number = 0;
	private _numMissing:number = 0;
	private _label:string = '';

	constructor(label?:string) {
		this._label = label || '';
	}

	public add(stat:IStatNum):Stat {
		this._numTested += stat.numTested();
		this._numExpected += stat.numExpected();
		this._numPassed += stat.numPassed();
		this._numFailed += stat.numFailed();
		this._numMissing += stat.numMissing();
		return this;
	}

	public getLabel():string {
		return this._label;
	}

	public getShort():string {
		return (this._label ? ('"' + this._label + '" ') : '') + this.hasPassed() + ' [' + [this.numMissing(), this.numFailed()].join(' ') + '] [' + [this.numPassed(), this.numTested(), this.numExpected()].join(' ') + ']';
	}
	public getBlock():string {
		var fields:any[] = [];

		if( this._label) {
			fields.push(['label', '"' + this._label + '"']);
		}
		fields.push([<any>'hasPassed',this.hasPassed()]);
		fields.push([<any>'numTested',this.numTested()]);
		fields.push([<any>'numExpected',this.numExpected()]);
		fields.push([<any>'numFailed',this.numFailed()]);
		fields.push([<any>'numMissing',this.numMissing()]);
		fields.push([<any>'numPassed',this.numPassed()]);

		var max = 0;
		util.eachArray(fields, (vars:any[]) => {
			max = Math.max(max, vars[0].length);
		});

		var ret:any[] = [];
		util.eachArray(fields, (vars:any[]) => {
			var str:string = vars[0];
			while (str.length < max) {
				str += ' ';
			}
			ret.push(str + ' : ' + vars[1]);
		});

		return ret.join('\n');
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
		return this._numMissing;
	}

	public hasExpected():bool {
		return (this._numExpected > 0 && this._numTested === this._numExpected);
	}

	public hasPassed():bool {
		return this._numFailed === 0 && this.hasExpected();
	}
}