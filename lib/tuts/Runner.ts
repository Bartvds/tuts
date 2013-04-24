///<reference path='core/Group.ts'/>
///<reference path='core/GroupResult.ts'/>
///<reference path='core/Item.ts'/>
///<reference path='core/Test.ts'/>
///<reference path='system/System.ts'/>
///<reference path='util/collection.ts'/>
///<reference path='types.ts'/>

module tuts {
	export class Runner {

		private _groups:Group[] = [];
		private _results:GroupResult[] = [];
		private _running:Test[] = [];

		constructor() {
			System.console.log('Runner ' + Math.round(Math.random() * Math.pow(10, Math.random() * 8)), this);
		}

		getGroup(label:string):IGroup {
			var group = new Group(label);
			this._groups.push(group);
			return group;
		}

		run(reporter:IReporter) {
			System.console.log('run', this);

			var self:Runner = this;

			util.eachArray(this._groups, (group:Group) => {

				util.eachArray(group.getItems(), (item:Item) => {

					var test = new Test(item);
					//self._items.push(test);

					test.run((test:Test) => {

					});


					//self.check();

				}, this);

			}, this);
		}
	}
}