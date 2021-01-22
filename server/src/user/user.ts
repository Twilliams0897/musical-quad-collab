import logger from '../log';
import userService from './user.service';

// add more codes below. Testing dynamodb connection purpose only. 
export class User {
    constructor(
        public name: string, 
        public password: string, 
        public money: number
        ){
    };
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


