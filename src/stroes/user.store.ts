import { Store } from './store';
import { Action } from './reducers';

export interface UserState {
    name: string;
    id: string;
    loginStatus: boolean;
}

export enum UserActionTypeEnum {
    UPDATE_LOGIN_STATUE = 'updateLoginStatus'
}

export const userInitialState: UserState = {
    name: 'test',
    id: 'test',
    loginStatus: true
};

export const userReducer = {
    [UserActionTypeEnum.UPDATE_LOGIN_STATUE]: (state: Store, action: Action) => ({
        ...state,
        user: { ...state.user, loginStatus: action.payload.loginStatus }
    })
};
