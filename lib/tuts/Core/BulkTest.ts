///<reference path='Group.ts'/>
///<reference path='GroupRun.ts'/>
///<reference path='../types.ts'/>

class BulkTest implements IResult {

	private _queuedGroups:GroupRun[] = [];
	private _activeGroups:GroupRun[] = [];
	private _completedGroups:GroupRun[] = [];

	private _concurrentMax:number = 2;
	private _reporter:IReporter;

	private _running:bool;
	private _completed:bool;
	private _inStep:bool;
	private _callback:(err:any, result?:IResult) => void;

	private _uid:string = System.getUID();

	constructor(reporter:IReporter) {
		this._reporter = reporter;
	}

	public append(group:Group) {
		this._queuedGroups.push(new GroupRun(group));
	}

	public run(callback:(err:any, result?:IResult) => void) {
		if (this._running) {
			return;
		}
		this._running = true;
		this._callback = callback;
		this._reporter.runStart(this);

		this.step();
	}

	private groupCompleted(group:GroupRun) {
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

		var group:GroupRun;
		var self:BulkTest = this;
		var call = (group:GroupRun) => {
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

		this._reporter.runComplete(this);

		if (this._callback) {
			this._callback(null, this);
			this._callback = null;
		}
	}

	public getUID():string {
		return this._uid;
	}

	public getGroups():IGroupResult[] {
		return this._completedGroups.slice(0);
	}
	public getError():any {
		return null;
	}

	public hasPassed():bool {
		return this.getStat().hasPassed();
	}

	public getStat():IStat {
		var stat:Stat = new Stat();
		util.eachArray(this.getGroups(), (res:IGroupResult) => {
			stat.add(res.getStat());
		});
		return stat;
	}
}