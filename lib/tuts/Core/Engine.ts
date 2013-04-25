///<reference path='Group.ts'/>
///<reference path='Item.ts'/>
///<reference path='ItemAssert.ts'/>
///<reference path='BulkTest.ts'/>
///<reference path='../system/System.ts'/>
///<reference path='../report/MultiReporter.ts'/>
///<reference path='../types.ts'/>
///<reference path='../../util/collection.ts'/>

class Engine implements IEngine {

	private _groups:Group[] = [];
	private _reporter:MultiReporter = new MultiReporter();

	constructor() {

	}

	addModuleGroup(name:string, mod:any) {
		if (!mod) {
			this._reporter.log('not a module: ' + name);
		} else if (!mod.test) {
			this._reporter.log('missing test() on module: ' + name);
		} else {
			var group = this.getGroup(name);
			mod.test(group);
			this._reporter.log('added module: ' + name);
		}
	}

	getGroup(label:string):IGroup {
		var group = new Group(label);
		this._groups.push(group);
		return group;
	}

	addReporter(reporter:IReporter) {
		this._reporter.append(reporter);
	}

	run(callback?:(error:any, result?:IResult) => void) {
		var queue = new BulkTest(this._reporter);
		util.eachArray(this._groups, (group:Group) => {
			queue.append(group);
		}, this);
		//beh
		queue.run(callback);
	}

	get reporter():IReporter {
		return this._reporter
	}
}
