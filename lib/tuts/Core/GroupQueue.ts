///<reference path='Group.ts'/>
///<reference path='Result.ts'/>
///<reference path='GroupTest.ts'/>
///<reference path='../types.ts'/>

class GroupQueue {

	private _queuedGroups:GroupTest[] = [];
	private _activeGroups:GroupTest[] = [];
	private _completedGroups:GroupTest[] = [];

	private _concurrentMax:number = 2;
	private _reporter:IReporter;

	private _running:bool;
	private _completed:bool;
	private _inStep:bool;
	private _callback:(err:any, result?:IResult) => void;

	constructor(reporter:IReporter) {
		this._reporter = reporter;
	}

	public append(group:Group) {
		this._queuedGroups.push(new GroupTest(group));
	}

	public run(callback:(err:any, result?:IResult) => void) {
		if (this._running) {
			return;
		}
		this._running = true;
		this._callback = callback;
		this._reporter.runStart();
		this.step();
	}

	private groupCompleted(group:GroupTest) {
		var i = this._activeGroups.indexOf(group);
		if (i >= 0) {
			this._activeGroups.splice(i, 1);
			this._completedGroups.push(group);

			this._reporter.groupComplete(group);
			if (!this._inStep) {
				this.step();
			}
		}
	}

	private step() {

		var group:GroupTest;
		var self:GroupQueue = this;
		var call = (group:GroupTest) => {
			self.groupCompleted(group);
		};
		this._inStep = true;

		while (this._queuedGroups.length > 0 && this._activeGroups.length < this._concurrentMax) {
			group = this._queuedGroups.shift();
			this._activeGroups.push(group);

			this._reporter.groupStart(group);

			group.run(this._reporter, call);
		}

		this._inStep = false;

		if (this._queuedGroups.length == 0 && this._activeGroups.length == 0) {
			this.finish();
		}
	}

	private finish() {
		if (!this._running) {
			return;
		}
		this._running = false;
		if (this._completed) {
			return;
		}
		this._completed = true;

			var result:IResult = new Result(this._completedGroups.slice(0));

		this._reporter.runComplete(result);

		if (this._callback) {
			this._callback(null, result);
			this._callback = null;
		}
	}
}