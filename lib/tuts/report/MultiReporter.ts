///<reference path='../types.ts'/>
///<reference path='../../util/collection.ts'/>

module report {

	export class MultiReporter implements IReporter {

		private _reporters:IReporter[] = [];

		append(reporter:IReporter) {
			this._reporters.push(reporter);
		}
		getLabel():string {
			return 'MultiReporter';
		}

		log(value:string, sender?:any) {
			for (var i = 0, ii = this._reporters.length; i < ii; i++) {
				this._reporters[i].log(value, sender);
			}
		}

		runStart(result:IResult) {
			for (var i = 0, ii = this._reporters.length; i < ii; i++) {
				this._reporters[i].runStart(result);
			}
		}

		groupStart(group:IGroupResult) {
			for (var i = 0, ii = this._reporters.length; i < ii; i++) {
				this._reporters[i].groupStart(group);
			}
		}

		groupComplete(group:IGroupResult) {
			for (var i = 0, ii = this._reporters.length; i < ii; i++) {
				this._reporters[i].groupComplete(group);
			}
		}

		testStart(test:IItemResult) {
			for (var i = 0, ii = this._reporters.length; i < ii; i++) {
				this._reporters[i].testStart(test);
			}
		}

		testComplete(test:IItemResult) {
			for (var i = 0, ii = this._reporters.length; i < ii; i++) {
				this._reporters[i].testComplete(test);
			}
		}

		runComplete(result:IResult) {
			for (var i = 0, ii = this._reporters.length; i < ii; i++) {
				this._reporters[i].runComplete(result);
			}
		}

		toString():string {
			return this.getLabel();
		}
	}
}