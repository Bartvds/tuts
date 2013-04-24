///<reference path='../types.ts'/>

module tuts {

	export class LogReporter implements IReporter {
		sender:bool = true;

		constructor(public logger:ILogger, sender?:bool) {
			this.sender = !!sender;
		}

		getLabel():string {
			return 'LogReporter';
		}

		log(value:string, sender?:any) {
			this.logger.log('-> ' + value, this.sender ? sender : null);
		}

		runStart(engine:IEngine) {
			this.logger.log('-> testing started', this.sender ? engine : null);
		}

		groupStart(group:IGroup) {
			this.logger.log('-> started group: ' + group.getLabel(), this.sender ? group : null);
		}

		groupComplete(group:IGroup) {
			this.logger.log('-> completed group: ' + group, this.sender ? group : null);
		}

		testStart(test:ITest) {
			this.logger.log('-> started test: ' + test, this.sender ? test : null);
		}

		testComplete(test:ITest) {
			this.logger.log('-> completed test: ' + test, this.sender ? test : null);
		}

		runComplete(result:IResult) {
			this.logger.log('-> testing completed' + result, this.sender ? result : null);
		}

		toString():string {
			return this.getLabel();
		}
	}
}