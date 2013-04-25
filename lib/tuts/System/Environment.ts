declare var process;
declare var document;
declare var window;

class Environment {
	public static isNode():bool {
		return !Environment.isBrowser() && typeof process === "object";
	}

	public static isBrowser():bool {
		return typeof window === "object" && typeof document === "object";
	}
}
