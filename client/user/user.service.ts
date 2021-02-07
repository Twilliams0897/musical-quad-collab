import axios from 'axios';
import { User } from './user';

class UserService {
	private URI: string;
	constructor() {
		// URL of the express server
		this.URI = 'http://localhost:3000/users/';
		//this.URI = 'http://35.166.133.163:3000/users';
	}
	getLogin(): Promise<User> {
		// withCredentials sends our cookies with the request.
		return axios
			.get(this.URI, { withCredentials: true })
			.then((result: any) => {
				console.log(result);
				return result.data;
			}).catch ((err) => {
				console.log(err);
			});
	}

	login(user: User): Promise<User> {
		return axios
			.post(this.URI, user, { withCredentials: true })
			.then((result: any) => result.data)
			.catch((err: any) => err);
	}
	logout(): Promise<null> {
		return axios
			.delete(this.URI, { withCredentials: true })
			.then((result: any) => null);
	}

	deleteByUsername(username: string): Promise<null> {
		return axios
			.delete(this.URI + '/' + username, { withCredentials: true })
			.then((result) => null)
			.catch((err) => err);
    }

    updateUser(user: User): Promise<null> {
        return axios
            .put(this.URI, user, {withCredentials: true})
            .then(result => null);
	}
	
	getUsers(): Promise<User []> {
		return axios
		.get(this.URI)
		.then((result) => {
			console.log(result.data);
			return result.data;
		}).catch((err) => {
			console.error(err)
		})
			.then((result: any) => null)
			.catch((err: any) => err);
	}

	//Look here to updat and add user... guesstimate what you need from the above
	//statements. BE WARNED
	addUser(user: User): Promise<null> {
		return axios
			.post(this.URI + 'register', user, { withCredentials: true })
			.then((result: any) => result.data)
			.catch((err) => err);
	}
}

export default new UserService();
