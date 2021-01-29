import axios from 'axios';
import { Song } from './song';

class SongService {
	private URI: string;
	constructor() {
		this.URI =
			'https://v3gpanxg9k.execute-api.us-west-2.amazonaws.com/default/gethomesongs';
	}

	async getHomeSongs(): Promise<Song[]> {
		return axios
			.get(this.URI)
			.then((result) => result.data)
			.catch((err) => {
				console.error(err);
			});
	}
}

export default new SongService();
