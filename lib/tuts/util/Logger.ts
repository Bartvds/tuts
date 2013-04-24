///<reference path='../types.ts'/>

class Logger implements ILogger {

	private _enabled:bool;

	constructor(enabled?:bool) {
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
		console.log(arr);
	}
}