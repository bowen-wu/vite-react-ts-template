import { login, LoginUserInfo, logout } from '../utils';
import { cleanup } from '@testing-library/react';

describe('Test utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
    localStorage.clear();
  });

  it('test login', () => {
    const spyLocalStorageSetItem = jest.spyOn(localStorage, 'setItem');
    expect(localStorage.getItem('user')).toBeFalsy();
    const userInfo: LoginUserInfo = {
      username: 'test',
      rememberAccount: false,
      token: 'tempToken'
    };
    login(userInfo);
    expect(spyLocalStorageSetItem).toBeCalled();
    const localUserString = localStorage.getItem('user');
    expect(localUserString).toBeTruthy();
    if (localUserString) {
      const localUser = JSON.parse(localUserString);
      expect(localUser.username).toBe(userInfo.username);
      expect(localUser.token).toBe(userInfo.token);
      expect(localUser.rememberAccount).toBe(userInfo.rememberAccount);
    }
  });

  it('test logout', () => {
    const spyLocalStorageSetItem = jest.spyOn(localStorage, 'setItem');
    const spyLocalStorageGetItem = jest.spyOn(localStorage, 'getItem');
    expect(localStorage.getItem('user')).toBeFalsy();
    const userInfo: LoginUserInfo = {
      username: 'test',
      rememberAccount: false,
      token: 'tempToken'
    };
    login(userInfo);
    logout();
    expect(spyLocalStorageSetItem).toBeCalledTimes(2);
    expect(spyLocalStorageGetItem).toBeCalledTimes(2);
    const localUserString = localStorage.getItem('user');
    expect(localUserString).toBeTruthy();
    if (localUserString) {
      const localUser = JSON.parse(localUserString);
      expect(localUser.username).toBe(userInfo.username);
      expect(localUser.token).toBe(undefined);
      expect(localUser.rememberAccount).toBe(userInfo.rememberAccount);
    }
  });
});