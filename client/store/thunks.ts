import { AppState } from './store';
import { AppAction, getSongs, getUser } from './actions';
import { ThunkAction } from 'redux-thunk';
import songService from '../song/song.service';
import userService from '../user/user.service';

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	AppAction
>;

export const thunkGetSongs = (): AppThunk => async (dispatch) => {
	const asyncResp = await songService.getSongs();
	console.log('before thunk dispatch', asyncResp);
	dispatch(getSongs(asyncResp));
};

export const thunkGetUsers = (): AppThunk => async (dispatch) => {
	const asyncResp = await userService.getLogin();
	console.log('before thunk dispatch');
	dispatch(getUser(asyncResp));
};
