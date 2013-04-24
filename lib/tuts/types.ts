
interface IGroup {
	add(label:string, execute:(test:ITest) => void);
}
interface ITest {
	expect(amount:number);
	//async returns a closure
	async(label:string, seconds?:number):(error?:any) => void;
	//asserts
	isTrue(a:bool, label:string);
}
interface ILogger {
	enabled(value?:bool):bool;
	log(value:any, sender?:any);
}
interface IResult {
	hasErrors():bool;
	report(reporter:IReporter);
}
interface IReporter {
	getLabel():string;
}
interface IResponder{
	testUpdate();
}

