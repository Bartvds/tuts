///<reference path='Stat.ts'/>
///<reference path='../types.ts'/>
///<reference path='../../util/collection.ts'/>

class Result implements IResult {

	private _groups:IGroupResult[];

	constructor(groups:IGroupResult[]) {
		this._groups = groups || [];
	}

	public getError():any {

	}

	public getGroups():IGroupResult[] {
		return this._groups.slice(0);
	}

	public hasPassed():bool {
		return this.getStat().hasPassed();
	}
	public getStat():IStat {
		var stat:Stat = new Stat();
		util.eachArray(this._groups, (res:IGroupResult) => {
			stat.add(res.getStat());
		});
		return stat;
	}
}