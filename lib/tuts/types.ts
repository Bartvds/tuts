
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
interface ILogger {
	enabled(value?:bool):bool;
	log(value:any, sender?:any);
}
interface IResult {
}
interface IEngine {
	getGroup(label:string):IGroup;
	getGroups():IGroup[];
}
interface IReporter {
	getLabel():string;

	log(value:string, sender?:any);
	runStart(engine:IEngine);
	groupStart(group:IGroup);
	groupComplete(group:IGroup);
	testStart(test:ITest);
	testComplete(test:ITest);
	runComplete(result:IResult);
}
interface IResponder{
	testUpdate();
}

