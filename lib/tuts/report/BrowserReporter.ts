///<reference path='../types.ts'/>

module tuts {

	export class BrowserReporter implements IReporter {
		private element:HTMLElement;

		constructor(element:HTMLElement) {
			if (!Environment.isBrowser()) {
				throw(new Error('BrowserReporter only works in a browser!'));
			}
			if (!element) {
				throw(new Error('null element!'));
			}
			this.element = element;

		}

		log(value:string, sender?:any) {

		}

		getLabel():string {
			return 'BrowserReporter';
		}

		runStart(engine:IEngine) {

		}

		groupStart(group:IGroup) {

		}

		groupComplete(group:IGroup) {

		}

		testStart(test:ITest) {

		}

		testComplete(test:ITest) {

		}

		runComplete(result:IResult) {

		}

		toString():string {
			return this.getLabel();
		}
	}
}