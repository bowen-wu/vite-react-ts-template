## 智能矿灯项目

### Start
```
yarn
yarn start
```

### Contract 
每个页面的最外层 ` div ` 的 ` className ` 属性需要和当前 ` router ` 的 ` key ` 保持一致

#### Example
```
// Home/index.tsx
return <div className='home-example'></div>

// routeConfig.ts
...
{
    key: 'home-example',
    path: '/',
    component: Home
}
...

```

### TODO
1. fetch -> 仅对 fetch.ts + api.ts 测试是否有意义
