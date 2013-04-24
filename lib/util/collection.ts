module util {
	export function eachArray(collection:any[], callback:(value:any, index:number, collection:any[]) => void, thisArg?:Object) {
		for (var i = 0, ii = collection.length; i < ii; i++) {
			if (callback.call(thisArg, collection[i], i, collection) === false) {
				return;
			}
		}
	}

	export function eachHash(collection:Object, callback:(value:any, key:string, collection:Object) => void, thisArg?:Object) {
		for (var key in collection) {
			if (collection.hasOwnProperty(key)) {
				if (callback.call(thisArg, collection[key], key, collection) === false) {
					return;
				}
			}
		}
	}
}

