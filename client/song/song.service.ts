import axios from 'axios';
import { Song } from './song';

interface Query {
	artist?: string;
	title?: string;
}

class SongService {
	private URI: any;
	constructor() {
		// URL of the express server
		this.URI =
			'https://socqhojy48.execute-api.us-west-2.amazonaws.com/dev/songs';
	}

	getSongs(): Promise<Song[]> {
		return axios
			.get(this.URI)
			.then((result) => {
				return result.data;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	addSong(s: Song): Promise<null> {
		return axios.post(this.URI, s).then((result) => null);
	}
	updateSong(s: Song): Promise<null> {
		return axios.put(this.URI, s).then((result) => null);
	}

	deleteSong(song_id: Number): Promise<null> {
		return axios
			.delete(this.URI + '/' + song_id, { withCredentials: true })
			.then((result) => null);
	}
	searchSongs(query: Query): Promise<Song[]> {
		return axios
			.post(
				'https://1bt2tfiy3m.execute-api.us-west-2.amazonaws.com/dev/search/',
				query
			)
			.then((result) => result.data);
	}
} // end of SongService

export default new SongService();
