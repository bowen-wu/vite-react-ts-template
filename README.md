## 智能矿灯项目

### Start
```
yarn
yarn start
```

### Contract 

#### Login Status
1. Login Action => save ` user: {remember: boolean, username: string, token: string} ` to localStorage
2. Login Status => check localStorage ` user.token `
   - ` Boolean(user.token) === true ` => Login Status
   - ` Boolean(user.token) === false ` => Logout Status
3. Logout Action => remove localStorage ` user.token ` => ` user:{remember: boolean, username: string} `

### TODO
1. fetch -> 仅对 fetch.ts + api.ts 测试是否有意义
