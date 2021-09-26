import { Store } from './initializeStore';
import { Action } from './reducers';

export interface UserState {
  username: string;
  mobile: string;
  department: string;
}

export enum UserActionTypeEnum {
  UPDATE_USER_INFO = 'updateUserInfo',
  INITIAL_USER_INFO = 'initialUserInfo'
}

export const userInitialState: UserState = {
  username: '',
  mobile: '',
  department: ''
};

export const userReducer = {
  [UserActionTypeEnum.UPDATE_USER_INFO]: (state: Store, action: Action) => ({
    ...state,
    user: { ...state.user, ...action.payload }
  }),
  [UserActionTypeEnum.INITIAL_USER_INFO]: (state: Store) => ({
    ...state,
    user: userInitialState
  })
};
