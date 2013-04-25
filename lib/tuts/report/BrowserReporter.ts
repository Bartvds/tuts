///<reference path='../types.ts'/>
///<reference path='../../util/collection.ts'/>

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

		runStart(result:IResult) {

		}

		groupStart(group:IGroupResult) {

		}

		groupComplete(group:IGroupResult) {

		}

		testStart(test:IItemResult) {

		}

		testComplete(test:IItemResult) {

		}

		runComplete(result:IResult) {

		}

		toString():string {
			return this.getLabel();
		}
	}
}