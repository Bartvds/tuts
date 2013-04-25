
interface IGroup {
	add(label:string, execute:(test:ITest) => void);
	getLabel():string;
}
interface ITest {
	expect(amount:number);
	//async returns a closure
	async(label:string, seconds?:number):(error?:any) => void;
	//asserts
	isTrue(a:bool, label:string):bool;
	isEqual(a:any, b:any, label:string):bool;
	isStrictEqual(a:any, b:any, label:string):bool;
}
interface IEngine {
	getGroup(label:string):IGroup;
}
interface IReporter {
	getLabel():string;

	log(value:string, sender?:any);

	runStart();
	groupStart(group:IGroupResult);
	groupComplete(group:IGroupResult);
	testStart(test:IItemResult);
	testComplete(test:IItemResult);
	runComplete(result:IResult);
}
interface IResult {
	getShort():string;
	getError():any;
	getGroups():IGroupResult[];
}
interface IGroupResult {
	getLabel():string;
	getItems():IItemResult[];
}
interface IItemResult extends IStat {
	getLabel():string;
	isAsync():bool;
	isStarted():bool;
	isFinished():bool;
}
interface IStat {
	totalTested():number;
	numExpected():number;
	numPassed():number;
	numFailed():number;
	hasExpected():bool;
	hasPassed():bool;
}

interface ILogger {
	enabled(value?:bool):bool;
	log(value:any, sender?:any);
}