///<reference path='../types.ts'/>
///<reference path='Environment.ts'/>

class ConsoleLogger implements ILogger {

	private _enabled:bool;
	private _asObject:bool;

	constructor(asObject?:bool, enabled?:bool) {
		this._enabled = !!enabled;
		this._asObject = !!asObject;
	}

	static getLogger():ILogger {
		if (Environment.isBrowser()){
			return new ConsoleLogger(true);
		}
		else {
			return new ConsoleLogger(false);
		}
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
		if (this._asObject) {
			var arr = [value]
			if (sender) {
				arr.push(sender);
			}
			console.log(arr);
		}
		else {
			if (sender) {
				console.log(value + ' - ' + sender);
			}
			else {
				console.log(value + '');
			}
		}

	}
}