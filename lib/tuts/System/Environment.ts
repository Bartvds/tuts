class Environment {
	public static isNode():bool {
		return !(typeof ActiveXObject === "function");
	}

	public static isBrowser():bool {
		return !Environment.isNode();
	}
}
