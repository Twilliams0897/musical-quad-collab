export class User {
    name = '';
    password = '';
    role?: string;   // "Customer", "Employee", "Admin"
    credits?: number;
    playlist?: Song[];
}

// temporalily here
class Song {
    song_id?: number;
    clicked?: number;

}