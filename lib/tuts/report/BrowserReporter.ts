///<reference path='../types.ts'/>
///<reference path='../../util/collection.ts'/>


class BrowserReporter implements IReporter {
	private _element:HTMLElement;

	constructor(element:HTMLElement) {
		if (!Environment.isBrowser()) {
			throw(new Error('BrowserReporter only works in a browser!'));
		}
		if (!element) {
			throw(new Error('null element!'));
		}
		this._element = element;

		document.title = 'waiting';
	}

	log(value:string, sender?:any) {

	}

	getLabel():string {
		return 'BrowserReporter';
	}

	runStart(result:IResult) {
		document.title = 'running';
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
		document.title = result.hasPassed() ? 'pass' : 'fail';
	}

	toString():string {
		return this.getLabel();
	}
}