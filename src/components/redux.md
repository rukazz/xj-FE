Redux:

1. 状态统一至 state，STORE 管理 state
2. store 按照 reducer 创建。
3. reducer 根据 action，将新状态更新到 store 上
4. dispatch 触发 action
5. subscribe?
6. 中间件？

Redux 需要提供的：

1. createStroe()
2. subscribe, dispatch, getState
3. combineReducers()
4. applyMiddleware()
