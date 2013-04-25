///<reference path='../types.ts'/>


class LogReporter implements IReporter {
	private _sender:bool = true;
	private _prefix:string;

	constructor(public logger:ILogger, sender?:bool, prefix?:string) {
		this._sender = !!sender;
		this._prefix = arguments.length >= 3 ? prefix : '-> ';
	}

	getLabel():string {
		return 'LogReporter';
	}

	runStart(result:IResult) {
		this.logger.log(this._prefix + 'testing started');
	}

	groupStart(group:IGroupResult) {
		this.logger.log(this._prefix + 'started group: "' + group.getLabel() + '"', this._sender ? group : null);
	}

	groupComplete(group:IGroupResult) {
		this.logger.log(this._prefix + 'completed group: ' + group.getStat().getShort(), this._sender ? group : null);
	}

	testStart(test:IItemResult) {
		//this.logger.log(this._prefix + 'started test: "' + test.getLabel() + '"', this.sender ? test : null);
	}

	testComplete(test:IItemResult) {
		this.logger.log(this._prefix + 'completed test: ' + test.getStat().getShort(), this._sender ? test : null);
	}

	runComplete(result:IResult) {
		var stat = result.getStat();
		this.logger.log(this._prefix + 'testing completed: ' + stat.getShort(), this._sender ? result : null);
		this.logger.log(stat.getBlock());
	}

	log(value:string, sender?:any) {
		this.logger.log(this._prefix + value, this._sender ? sender : null);
	}

	toString():string {
		return this.getLabel();
	}
}
