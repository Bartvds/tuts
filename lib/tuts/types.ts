
interface IGroup {
	add(label:string, execute:(test:Test) => void);
}
interface ITest {
	expect(amount:number);
	async(label:string, seconds?:number):(error?:any) => void;
	isTrue(a:bool, label:string);
}
interface ITestResult {

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

