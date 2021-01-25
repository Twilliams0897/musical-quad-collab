import logger from '../log';
import userService from './user.service';


// add more codes below. Testing dynamodb connection purpose only. 
export class User {
    constructor(
        public userId: number,
        public username: string, 
        public password: string, 
        public role: string, // "customer", "employee", "admin"
        public credits: number,
        public favorites: number[],
        public playlist: number[],
        ){
    };
}


export async function login(username: string, password: string): Promise<User|null> {
    logger.debug(`${username +' '+ password}`);
    return await userService.getUserByName(username).then((user)=> {
        if (user && user.password === password) {
            return user
        } else {
            return null;
        }
    })
}


