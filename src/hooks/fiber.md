React Fiber 浅析

### 问题是：

页面元素很多且需要刷新的情况下，React 15 会出现掉帧的现象。

### 原因：

单线程的浏览器慧被大量的同步计算任务阻塞的浏览器的 UI 渲染。浏览器的主线程包括 JS 运算，页面布局和页面绘制。如果复杂的 js 计算
持续占用主线程，之后再更新 UI，当计算的时间超过 16 毫秒，就会出现卡帧的情况。

### 解题思路：

1. 将主线程长时间的 JS 计算切割成多个步骤。意味着浏览器可以在完成一部分的任务，浏览器进行一部分的渲染，然后再去计算，依次往返。
2. 旧版的 React 通过递归的方式进行渲染，使用的是 js 引擎自身的函数调用栈。而 Fiber 实现了自己的组件调用栈，以链表的方式遍历组件树，好处是可以灵活的暂停，继续/丢弃，执行任务。
3. window.requestIdleCallback() 这个函数会在浏览器空闲的时期依次调用函数，可以在主事件循环中执行后台或优先级低的任务，不会对关键的事件产生影响。

### 实现：

React 框架的三层
Virtual DOM: 描述页面长什么样； Reconciler: 负责调用组件生命周期方法，进行 Diff 运算；Renderer: 根据不同的平台，渲染出相应的页面,ReactDOM/ReactNative
Reconciler(Stack Reconciler) => Fiber Reconciler
区别： stack reconciler 运作的过程不能被打断/ Fiber Reconciler 每执行一段事件，都会将控制交回给浏览器。可以分段执行。

```javascript
const fiber {
  stateNode, // 节点实例
  child, // 子节点
  sibling, // 兄弟节点
  return, // 父节点
}
```

为了实现 Fiber 的效果,需要有一个调度器(Scheduler)来进行任务分配
