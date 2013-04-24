///<reference path='../types.ts'/>

class HTMLLogger implements ILogger {

	private _enabled:bool;
	private element:HTMLElement;

	constructor(element:HTMLElement, enabled?:bool) {
		if (!element) {
			throw(new Error('null element!'));
		}
		this.element = element;
		this._enabled = !!enabled;
	}

	public enabled(value?:bool):bool {
		if (arguments.length == 1) {
			this._enabled = !!value;
		}
		return this._enabled;
	}

	public log(value:any, sender?:any) {
		if (!this.enabled) {
			return;
		}
		var arr = [value]
		if (sender) {
			arr.push(sender);
		}
		var node = document.createElement('div');
		node.classList.add('logLine');
		node.appendChild(document.createTextNode(arr.join(', ')));
		this.element.appendChild(node);
	}
}
