import axios from 'axios';
import { Song } from './song';

class SongService {
    private URI: any;
    constructor() {
        // URL of the express server
        this.URI = process.env.SERVER + '/pg/songs';
    }

    getSongs(): Promise<Song []> {
        return axios.get(this.URI).then(result => result.data).catch((err) => {console.error(err)});
    }

    addSong(s: Song): Promise<null> {
        return axios.post(this.URI, s).then(result => null);
    }
    updateSong(s: Song): Promise<null> {
        return axios.put(this.URI, s).then(result => null);
    }

    deleteSong(song_id: number): Promise<null> {
        console.log(song_id);
        return axios.delete(this.URI+'/'+ song_id, {withCredentials: true}).then(result => null)
    }

}  // end of SongService

export default new SongService();