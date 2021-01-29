<<<<<<< HEAD
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
=======

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


>>>>>>> ccaac1dcb6c5c75bef1edb6760983bf2c63d87c8
