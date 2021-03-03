import { createAction, props } from '@ngrx/store';

export const LOGIN_START = '[login page] login start';
export const LOGIN_SUCCESS = '[login page] login success';

export const loginStart = createAction(LOGIN_START, props<{ email: string, password: string }>());
export const loginSuccess = createAction(LOGIN_SUCCESS);