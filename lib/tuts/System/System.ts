///<reference path='../types.ts'/>
///<reference path='ConsoleLogger.ts'/>

class System {

	public static console:ILogger;

	public static init() {
		if (!System.console){
			System.console = ConsoleLogger.getLogger();
		}
	}

	private static __counter:number = Math.round(Math.random() * 1000);

	public static getUID():string {
		return 'uid|' + (__counter++);
	};
}