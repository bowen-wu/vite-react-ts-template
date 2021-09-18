export const logout = () => {
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

export const login = (userInfo: LoginUserInfo) => {
  localStorage.setItem('user', JSON.stringify(userInfo));
};
