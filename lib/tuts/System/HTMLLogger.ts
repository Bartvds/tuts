///<reference path='../types.ts'/>
///<reference path='../../util/collection.ts'/>

class HTMLLogger implements ILogger {

	private _enabled:bool;
	private element:HTMLElement;
	private list:HTMLElement;

	constructor(element:HTMLElement, enabled?:bool) {
		if (!element) {
			throw(new Error('null element!'));
		}
		this.element = element;
		this._enabled = !!enabled;

		this.list = document.createElement('ul');
		this.list.classList.add('logList');
		this.element.appendChild(this.list);
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

		var node = document.createElement('li');
		node.classList.add('logLine');

		var arr = [value]
		if (sender) {
			arr.push(sender);
		}
		value = arr.join(', ');

		value = value.split(/\r?\n/);

		util.eachArray(value, (str:string, i:number, arr:any[]) => {
			node.appendChild(document.createTextNode(str));
			if (i < arr.length - 1) {
				node.appendChild(document.createElement('br'));
			}
		});
		this.list.appendChild(node);
	}
}
