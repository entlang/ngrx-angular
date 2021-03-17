import { sharedReducer } from './shared.reducer';
import { SHARED_STATE_NAME } from './shared.selector';
import { SharedState } from './shared.state';

export interface AppState {
    [SHARED_STATE_NAME]: SharedState
}

export const appReducer = {
    [SHARED_STATE_NAME]: sharedReducer
}