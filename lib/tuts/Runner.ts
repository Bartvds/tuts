///<reference path='Core/Group.ts'/>
///<reference path='Core/GroupResult.ts'/>
///<reference path='Core/Item.ts'/>
///<reference path='Core/Test.ts'/>
///<reference path='Util/Util.ts'/>
///<reference path='types.ts'/>

module Tuts {
	export class Runner {

		private _groups:Group[] = [];
		private _results:GroupResult[] = [];
		private _items:TestResult[] = [];

		constructor() {

		}

		getGroup(label:string):IGroup {
			var group = new Group(label);
			this._groups.push(group);
			return group;
		}

		run(reporter:IReporter) {
			var self:Runner = this;
			Util.eachArray(this._groups, (group:Group) => {

				Util.eachArray(group.getItems(), (item:Item) => {
					var test = new Test(item);
					var result = test.result;
					self._items.push(result);

					item.execute(test);

					//self.check();

					if (result.completed) {
						if (result.isError()) {

						}
						else {

						}
					}
					else if (result.isAsync()) {

					}
					else {

					}
				}, this);

			}, this);
		}
	}
}