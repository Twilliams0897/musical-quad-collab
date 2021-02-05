import * as Actions from './actions';
import { Song } from '../song/song';
import { User } from './../user/user';
import { AppState } from './store';
import { Playlist } from '../playlist/playlist';

// We need to define the initial state of the application and that
// state should include everything that the application might keep track of.

export const initialState: AppState = {
	user: new User(),
	loginUser: new User(),
	songlist: [],
	song: new Song(),
	songInput: new Song(),
	playlist: [],
	playlists: [],
	favorites: [],
};

// Make sure that the reducer has a default argument of the inital state or it will not work.
const reducer = (
	state: AppState = initialState,
	action: Actions.AppAction
): AppState => {
	//console.log(action);
	// We want to call setState. (redux will do that when we return a new state object from the reducer)
	const newState = { ...state }; // If we return this, it will re render the application. (call setState)

	switch (action.type) {
		case Actions.UserActions.GetUser:
			newState.user = action.payload as User;
			newState.loginUser = new User();
			return newState;
		case Actions.UserActions.LoginChange:
			newState.loginUser = action.payload as User;
			return newState;
		case Actions.SongActions.GetSongs:
			newState.songlist = action.payload as Song[];
			return newState;
		case Actions.SongActions.SongChange:
			newState.song = action.payload as Song;
			return newState;
		case Actions.SongActions.SongInputAction:
			newState.songInput = action.payload as Song;
			return newState;
		case Actions.SongActions.PlaylistChange:
			newState.playlist = action.payload as Song[];
			return newState;
		case Actions.SongActions.FavoritesChange:
			newState.favorites = action.payload as Song[];
			return newState;
		case Actions.SongActions.GetPlaylists:
			newState.playlists = action.payload as Playlist[][];
			return newState;
		default:
			return state;
	}
};

export default reducer;
