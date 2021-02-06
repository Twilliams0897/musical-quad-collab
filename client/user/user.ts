export class User {
	constructor(
		public userId?: number,
		public username = '',
		public password = '',
		public role?: string, // "Customer", "Employee", "Admin"
		public credits?: number,
		public playlist?: string[],
		public favorites?: number[]
	) {}
}

// temporaily here need to be moved to the correct folder
