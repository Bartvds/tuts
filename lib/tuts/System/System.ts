///<reference path='../types.ts'/>
///<reference path='../util/Logger.ts'/>

class System {

	public static console:ILogger;

	public static init() {
		if (!System.console)
		{
			System.console = new Logger();
		}
	}
}