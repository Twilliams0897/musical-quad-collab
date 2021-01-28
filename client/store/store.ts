import { applyMiddleware, createStore, Store } from "redux";
import thunk from "redux-thunk";
import {Song } from '../song/song';
import { User } from "../user/user";
import { AppAction } from "./actions";
import reducer from "./reducer";



// Define the items that are in our state
export interface SongState {
    songs: Song[];
    song: Song;
}

export interface UserState {
    user: User;
    loginUser: User;
    locale?: string;
}

export interface GrubState extends UserState, SongState { }
// <> is generics: Generic arguments allow us to define the type of a thing at runtime instead of when we write it,
// creating a reusable object.
const store: Store<GrubState, AppAction> = createStore(reducer, applyMiddleware(thunk));

export default store;