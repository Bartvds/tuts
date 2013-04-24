

class TutsBase {

	private _debug:bool = true;

	public log(value:any) {
		if (this._debug ) {
			System.getLogger().log(value, this);
		}
	}
}