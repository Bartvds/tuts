///<reference path='../types.ts'/>
///<reference path='../../util/each.ts'/>

class HTMLLogger implements ILogger {

	private _enabled:bool;
	private _element:HTMLElement;
	private _list:HTMLElement;

	constructor(element:HTMLElement, enabled?:bool) {
		if (!element) {
			throw(new Error('null element!'));
		}
		this._element = element;
		this._enabled = !!enabled;

		this._list = document.createElement('ul');
		this._list.classList.add('logList');
		this._element.appendChild(this._list);
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
		value = arr.join(', ').split(/\r?\n/);

		each.inArray(value, (str:string, i:number, arr:any[]) => {
			node.appendChild(document.createTextNode(str));
			if (i < arr.length - 1) {
				node.appendChild(document.createElement('br'));
			}
		});
		this._list.appendChild(node);
	}
}
