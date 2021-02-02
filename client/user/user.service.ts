import axios from 'axios';
import { User } from './user';

class UserService {
	private URI: string;
	constructor() {
        // URL of the express server
        //this.URI = 'http://localhost/users';
		this.URI = 'http://35.166.133.163:3000/users';
	}
	getLogin(): Promise<User> {
		// withCredentials sends our cookies with the request.
		return axios.get(this.URI, { withCredentials: true }).then((result) => {
			console.log(result);
			return result.data;
		});
	}

	login(user: User): Promise<User> {
		return axios
			.post(this.URI, user, { withCredentials: true })
			.then((result) => result.data)
			.catch((err) => err);
	}
	logout(): Promise<null> {
		return axios
			.delete(this.URI, { withCredentials: true })
			.then((result) => null);
	}

	deleteByUsername(username: string): Promise<null> {
		return axios
			.delete(this.URI + '/' + username, { withCredentials: true })
			.then((result) => null)
			.catch((err) => err);
    }
    
    addUser(user: User): Promise<null> {
        return axios
            .post(this.URI, user, {withCredentials: true})
            .then(result => null);
    }

    updateUser(user: User): Promise<null> {
        return axios
            .put(this.URI, user, {withCredentials: true})
            .then(result => null);
    }
}

export default new UserService();
