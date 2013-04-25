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
	hasPassed():bool;
	getStat():IStat;
	getError():any;
	getGroups():IGroupResult[];
}
interface IGroupResult {
	getLabel():string;
	getStat():IStat;
	getItems():IItemResult[];
}
interface IItemResult {
	getLabel():string;
	/*isAsync():bool;
	 isStarted():bool;
	 isFinished():bool;*/
	getStat():IStat;
}

interface IStat extends IStatNum {
	getLabel():string;
	getShort():string;
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