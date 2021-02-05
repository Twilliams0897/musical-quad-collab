import axios from 'axios';
import { Song } from './song';

interface Query {
	artist?: string;
	title?: string;
}

interface Clicks {
	clicks: Number;
}

class SongService {
	private URI: any;
	constructor() {
		// URL of the express server
		this.URI = 'https://socqhojy48.execute-api.us-west-2.amazonaws.com/dev/';
	}

	getSongs(): Promise<Song[]> {
		return axios
			.get(this.URI + 'songs')
			.then((result) => {
				return result.data;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	// addSong(s: Song): Promise<null> {
	// 	return axios.post(this.URI + 'songs', s).then((result) => null);
	// }

	// updateSong(s: Song): Promise<null> {
	// 	return axios.put(this.URI + 'songs', s).then((result) => null);
	// }

	deleteSong(song_id: Number): Promise<null> {
		return axios
			.delete(this.URI + 'songs' + '/' + song_id)
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

	updateClicks(song_id: Number, clicks: Clicks): Promise<null> {
		return axios
			.put(this.URI + `clicks/${song_id}`, clicks)
			.then((result) => null);
	}
} // end of SongService

export default new SongService();
