传统路由

- 重复的资源请求
- 响应较慢，页面刷新，导致用户体验下降

      前端路由

* 改变 url，不引起页面的刷新
* 监听路由变化，根据路由渲染对应的页面（路由和组件匹配）
* 记录路由的状态

      两种方式实现

1. hash 的方式实现
2. 通过 HTML5 的 history 的 pushState/replaceState 实现

   react-router 的实现路由的机制

- 借助 history 库，history 实现了 push,go,goBack 等方法，注册了 hashChange 事件，当路由跳转时，使用浏览器内置的 history api 操作 history 栈。（改变）
- history 库对外暴露的 hisotry 对象提供了 listen 方法，<Router />组件会注册一个 listener（监听）。
- 调用 history.push/hashChange 事件触发时，执行 listener。
- <Router>注册的监听函数内部会 setState 更新状态，通过 Context, Provider 的 value 将路由信息传递给渲染。 （渲染）
- <Router>的子组件<Route>中的 context.Consumer 接收 value，根据当前的 path 和浏览器当前的 localtion 判断当前的 route 是否 match,匹配渲染 component (渲染)

history 暴露的方法:

```javascript
// 返回的方法
export interface Module {
  createBrowserHistory: typeof createBrowserHistory;
  createHashHistory: typeof createHashHistory;
  createMemoryHistory: typeof createMemoryHistory;
  createLocation: typeof createLocation;
  locationsAreEqual: typeof locationsAreEqual;
  parsePath: typeof parsePath;
  createPath: typeof createPath;
}

//
export interface History<HistoryLocationState = LocationState> {
  length: number;
  action: Action;
  location: Location<HistoryLocationState>;
  push(path: Path, state?: HistoryLocationState): void; //增加location
  push(location: LocationDescriptorObject<HistoryLocationState>): void;
  replace(path: Path, state?: HistoryLocationState): void; //替换当前的location
  replace(location: LocationDescriptorObject<HistoryLocationState>): void;
  go(n: number): void;
  goBack(): void;
  goForward(): void;
  block(prompt?: boolean | string | TransitionPromptHook): UnregisterCallback;
  listen(listener: LocationListener): UnregisterCallback; // 绑定设置的监听函数,传入回调函数listener,location变化时触发回调
  createHref(location: LocationDescriptorObject<HistoryLocationState>): Href;
}

export interface Location<S = LocationState> {
  pathname: Pathname; // url的基本路径
  search: Search; // 查询字段
  state: S;
  hash: Hash; // url中的hash值
  key?: LocationKey;
}
```

    hash 的特点

特点: 出现在 url 中,但是不会包括在 HTTP 请求中,hash 的改变不会重新加载页面,可以通过 wondow.hashchange 监听 hash 的变化

Router 组件本身只是一个容器，真正的路由要通过 Route 组件定义
path 属性，path 执行路由的匹配规则，可以 qiantao 路由

BrowserRouter 和 HashRouter 这两个组件，前者使用 pushState 和 popState 事件构建路由，基于 history 模式，后者使用 window.location.hash 和 hashchange 事件构建路由，基于 hash 模式，那么什么是 history，
