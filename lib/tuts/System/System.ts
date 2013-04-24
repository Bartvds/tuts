///<reference path='../types.ts'/>
///<reference path='ConsoleLogger.ts'/>

class System {

	public static console:ILogger;

	public static init() {
		if (!System.console){
			System.console = ConsoleLogger.getLogger();
		}
	}
}