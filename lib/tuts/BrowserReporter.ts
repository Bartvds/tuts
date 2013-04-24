///<reference path='Runner.ts'/>
///<reference path='types.ts'/>

module tuts {

	export class BrowserReporter implements IReporter {
		element:HTMLElement;

		constructor(element:HTMLElement) {
			this.element = element;
		}

		getLabel():string {
			return 'BrowserReporter';
		}

		toString():string {
			return this.getLabel();
		}
	}
}