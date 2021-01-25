export class User {
    userId?: number;
    username = '';
    password = '';
    role?: string;   // "Customer", "Employee", "Admin"
    credits?: number;
    playlist?: number[];
    favorites?: number[];

}

// temporaily here need to be moved to the correct folder
export class Playlist {
    playlist_id?: number;
    song_id?: number;
    user_id?: number;
 
} 

export class Song {
    song_id?: number;
    clicked?: number;
} 