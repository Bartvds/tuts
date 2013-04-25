///<reference path='../types.ts'/>

module tuts {

	export class LogReporter implements IReporter {
		sender:bool = true;
		prefix:string;

		constructor(public logger:ILogger, sender?:bool, prefix?:string) {
			this.sender = !!sender;
			this.prefix = arguments.length >= 3 ? prefix : '-> ';
		}

		getLabel():string {
			return 'LogReporter';
		}

		log(value:string, sender?:any) {
			this.logger.log(this.prefix + value, this.sender ? sender : null);
		}

		runStart() {
			this.logger.log(this.prefix + 'testing started');
		}

		groupStart(group:IGroupResult) {
			this.logger.log(this.prefix + 'started group: "' + group.getLabel() + '"', this.sender ? group : null);
		}

		groupComplete(group:IGroupResult) {
			this.logger.log(this.prefix + 'completed group: ' + group.getStat().getShort(), this.sender ? group : null);
		}

		testStart(test:IItemResult) {
			//this.logger.log(this.prefix + 'started test: "' + test.getLabel() + '"', this.sender ? test : null);
		}

		testComplete(test:IItemResult) {
			this.logger.log(this.prefix + 'completed test: ' + test.getStat().getShort(), this.sender ? test : null);
		}

		runComplete(result:IResult) {
			this.logger.log(this.prefix + 'testing completed: ' + result.getStat().getShort(), this.sender ? result : null);
		}

		toString():string {
			return this.getLabel();
		}
	}
}