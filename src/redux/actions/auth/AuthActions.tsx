import {AUTH_LOGIN_USER, AUTH_LOGOUT_USER} from '../ActionTypes';

export const loginUser = (data: any) => ({ type: AUTH_LOGIN_USER, payload: data });
export const logoutUser = (data: any) => ({ type: AUTH_LOGOUT_USER, payload: data });
