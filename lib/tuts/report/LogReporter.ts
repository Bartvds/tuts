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

		groupStart(group:IGroup) {
			this.logger.log(this.prefix + 'started group: ' + group.getLabel(), this.sender ? group : null);
		}

		groupComplete(group:IGroup) {
			this.logger.log(this.prefix + 'completed group: ' + group, this.sender ? group : null);
		}

		testStart(test:ITest) {
			this.logger.log(this.prefix + 'started test: ' + test, this.sender ? test : null);
		}

		testComplete(test:ITest) {
			this.logger.log(this.prefix + 'completed test: ' + test, this.sender ? test : null);
		}

		runComplete(result:IResult) {
			this.logger.log(this.prefix + 'testing completed' + result, this.sender ? result : null);
		}

		toString():string {
			return this.getLabel();
		}
	}
}