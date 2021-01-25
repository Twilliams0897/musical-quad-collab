import {GrubState} from './store';
import {AppAction } from './actions';
import {ThunkAction} from 'redux-thunk';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, GrubState, unknown, AppAction>;

