import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';

const _authReducer = createReducer(initialState, 
    on()
    );

export function authReducer(state, action) {
    return _authReducer(state, action);
}