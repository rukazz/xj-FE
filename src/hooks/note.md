useContext + useReducer
React 团队表示 hook 不是 Redux 的末日，而是希望 React【不是必须需要第三方库】也可以实现一些基本的功能。
useContext+useReducer 可以实现 接近 Redux 的功能，但可惜的是 Hooks 並沒有类似 combineReducer 的 Function ，原因是因为 React 中的 useReducer 是在使用的时候才会给 State ，这会导致每个 Reducer 管理 State 的 Container 都是分开的能够将所有的 Reducer 合并成一个，再交由 Provider 保管。

1. useContext
   1.createContext()创建一个全局 store;
   2.Store.Provider 实现 store 的传递;
   3.useContext(Store)使用全局 store。

2. useReducer

const [state, dispatch] = useReducer(reducer, initState)

1. reducer 表示 reducer action 内容， //一个 reducer 用来描述指令执行对应的 action，会返回一个新的 state 状态，是一个纯函数式
2. initalState 表示 state 的初始值

/_
使用 useReducer 將 Reducer 和 初始 State 分别传入，
将返回的数组解构赋值分別放到 state 和 dispatch 中，
state 会苏随着 Reducer 传的 state 做改变，
dispatch 是用來和 Reducer 沟通的 Function 。
_/

```javascript
// combine reducer
const reduceReducers = (...reducers) => (state, action) =>
  reducers.reduce((acc, nextReducer) => nextReducer(acc, action), state);

// combine dispatch
const combineDispatch = (...dispatches) => (action) =>
  dispatches.forEach((dispatch) => dispatch(action));

// Example
const [s1, d1] = useReducer(a, {}); // some init state {}
const [s2, d2] = useReducer(b, {}); // some init state {}

//  memoize
const combinedDispatch = React.useCallback(combineDispatch(d1, d2), [d1, d2]);
const combinedState = React.useMemo(() => ({ s1, s2, }), [s1, s2]);

<DispatchContext.Provider value={combinedDispatch}>
  <StateContext.Provider value={combinedState}> {children} </StateContext.Provider>
</DispatchContext.Provider>;
```

useContext + useReducer === Redux??

1. reducer 的 state 要绑在一起
2. dispatch 可以随时被呼叫

```
interface IThemeContext {
  color: string;
  dispatch: React.Dispatch<any>;
}

const defaultContextValue: IThemeContext = {
  color: 'blue',
  dispatch: () => null,
};

export const ThemeContext = React.createContext<IThemeContext>(defaultContextValue);

export const ThemeProvider: React.FC = ({ children }) => {
  const initialState = 'grey';

  const reducer = (state: string, action: string) => {
    switch (action) {
      case 'yellow':
        return 'yellow';
      case 'red':
        return 'red';
      default:
        return state;
    }
  };

  const [color, dispatch] = useReducer(reducer, initialState);

  return <ThemeContext.Provider value={{ color, dispatch }}>{children}</ThemeContext.Provider>;
};


```
