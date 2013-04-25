interface IGroup {
	add(label:string, execute:(test:ITest) => void);
}
interface ITest {
	expect(amount:number);
	//async returns a closure
	async(label:string, seconds?:number):(error?:any) => void;
	//asserts (need more)
	isTrue(a:bool, label:string):bool;
	isTrueish(a:bool, label:string):bool;
	isFalse(a:bool, label:string):bool;
	isFalsy(a:bool, label:string):bool;
	isEqual(a:any, b:any, label:string):bool;
	isEqualish(a:any, b:any, label:string):bool;
	isNotEqual(a:any, b:any, label:string):bool;
	isNotEqualish(a:any, b:any, label:string):bool;
}
interface IEngine {
	getGroup(label:string):IGroup;
}
interface IReporter {
	getLabel():string;

	log(value:string, sender?:any);

	runStart(result:IResult);
	groupStart(group:IGroupResult);
	groupComplete(group:IGroupResult);
	testStart(test:IItemResult);
	testComplete(test:IItemResult);
	runComplete(result:IResult);
}
interface ITestResult {
	getStat():IStat;
	getUID():string;
}
interface IResult extends ITestResult {
	hasPassed():bool;
	getError():any;
	getGroups():IGroupResult[];
}
interface IGroupResult extends ITestResult {
	getLabel():string;
	getItems():IItemResult[];
}
interface IItemResult extends ITestResult {
	getLabel():string;
	/*isAsync():bool;
	 isStarted():bool;
	 isFinished():bool;*/
}

interface IStat extends IStatNum {
	getLabel():string;
	getShort():string;
	getBlock():string;
	hasExpected():bool;
	hasPassed():bool;
}
interface IStatNum {
	numTested():number;
	numExpected():number;
	numPassed():number;
	numFailed():number;
	numMissing():number;
}

interface ILogger {
	enabled(value?:bool):bool;
	log(value:any, sender?:any);
}