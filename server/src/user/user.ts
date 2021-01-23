import logger from '../log';
import userService from './user.service';


// add more codes below. Testing dynamodb connection purpose only. 
export class User {
    constructor(
        public name: string, 
        public password: string, 
        public role: string, // "customer", "employee", "admin"
        public credits: number,
        public playlist: Song[],
        ){
    };
}

// temporalily here
class Song {
    song_id?: number;
    clicked?: number;

}

export async function login(name: string, password: string): Promise<User|null> {
    logger.debug(`${name +' '+ password}`);
    return await userService.getUserByName(name).then((user)=> {
        if (user && user.password === password) {
            return user
        } else {
            return null;
        }
    })
}


