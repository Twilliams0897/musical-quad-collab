export class User {
	userId?: number;
	username = '';
	password = '';
	role?: string; // "Customer", "Employee", "Admin"
	credits?: number;
	playlist?: number[];
	favorites?: number[];
}

// temporaily here need to be moved to the correct folder
