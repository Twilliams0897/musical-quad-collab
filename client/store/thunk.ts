import { AppState } from './store';
import { AppAction, getSongs } from './actions';
import { ThunkAction } from 'redux-thunk';
import SongService from '../song/song.service';

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	AppAction
>;

export const thunkGetHomeSongs = (): AppThunk => async (dispatch) => {
	const asyncResp = await SongService.getHomeSongs();
	dispatch(getSongs(asyncResp));
};
