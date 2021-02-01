import { Song } from '../song/song';
import {User} from '../user/user';

export enum SongActions {
    GetSongs ='GET_SONGS',
    ChangeSong = 'CHANGE_SONG'
}


export enum UserActions {
    GetUser = 'GET_USER',
    LoginChange = 'CHANGE_LOGIN',
    UpdateUser = 'UPDATE_USER'

}

export interface AppAction {
    type: string;
    payload: any;
}

export interface UserAction<P> extends AppAction {
    type: UserActions;
    payload: P;
}



export interface SongAction extends AppAction {
    type: SongActions;
    payload: Song | Song[];
}

export function getSongs (songs: Song[]): SongAction {
    const action: SongAction = {
        type: SongActions.GetSongs,
        payload: songs
    }
    return action;
}

export function changeSong(song: Song): SongAction {
    const action: SongAction = {
        type: SongActions.ChangeSong,
        payload: song
    }
    return action;
}


export function getUser(user: User): UserAction<User> {
    const action: UserAction<User>= {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}

export function loginAction(user: User): UserAction<User> {
    const action: UserAction<User> = {
        type: UserActions.LoginChange,
        payload: user
    }
    return action;
}

export function updateUser (user: User): UserAction<User> {
    const action: UserAction<User> = {
        type: UserActions.UpdateUser,
        payload: user
    }
    return action;
}