///<reference path='GroupResult.ts'/>
///<reference path='../types.ts'/>

class Result implements IResult {

	public groups:GroupResult[];

	constructor() {
	}

	add(group:Group) {
		var result = new GroupResult(group);
		this.groups.push(result);

	}

	hasErrors():bool {
		return false;
	}

	report(reporter:IReporter) {

	}
}