import { AppState } from './store';
import { AppAction, getSongs } from './actions';
import { ThunkAction } from 'redux-thunk';
import songService from '../song/song.service';

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	AppAction
>;

export const thunkGetSongs = (): AppThunk => async (dispatch) => {
	const asyncResp = await songService.getSongs();
	console.log('before thunk dispatch');
	dispatch(getSongs(asyncResp));
};
