
import {User} from './../user/user';



export enum UserActions {
    GetUser = 'GET_USER',
    LoginChange = 'CHANGE_LOGIN'
}

export interface AppAction {
    type: string;
    payload: any;
}

export interface UserAction extends AppAction {
    type: UserActions;
    payload: User;
}





export function getUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}

export function loginAction(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.LoginChange,
        payload: user
    }
    return action;
}