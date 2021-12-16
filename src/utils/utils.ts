export const storageRemoveLoginInfo = () => {
  const localUserString = localStorage.getItem('user');
  if (localUserString) {
    const { username, rememberAccount } = JSON.parse(localUserString);
    localStorage.setItem('user', JSON.stringify({ username, rememberAccount }));
  }
};

export interface LoginUserInfo {
  username: string;
  rememberAccount: boolean;
  token: string;
}

export const loginUserInfoSaveToStorage = (user: LoginUserInfo) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const isLogged = () => {
  const localUser = localStorage.getItem('user');
  return Boolean(localUser && JSON.parse(localUser).token);
};
