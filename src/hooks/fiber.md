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

为了实现 Fiber 的效果,需要有一个调度器(Scheduler)来进行任务分配。

// react 的入口函数
ReactDOM.render(<p>Hello world</p>, root)

React 课程介绍

1. 理念篇

- 设计理念,
- 架构演进史
- Fiber 架构

2. 架构篇

- render 阶段
- commit 阶段

3. 实现篇

- Diff 算法
- 状态更新
- 生命周期
- Hooks
- 异步调度

React 想实现异步更新机制来实现快速响应，这是 react 的设计理念，制约瓶颈是 CPU 与 IO，解决办法是异步可中断更新。

## 架构的演进史：

- Reconciler（协调器 Diff 算法）: 决定渲染什么组件
- Rendered:将组件渲染到视图中 React.DOM 渲染器（浏览器，SSR），ReactNative（APP 原生组件）, ReactTest（渲染 JS 对象）， ReactArt(canvas, SVG)

老的 React 架构，点击按钮到视图更新发生了什么, 同步更新的流程，

<li> 1</li> => <li>2</li> 1. 协调器发现1需要变为2，通知渲染器，渲染器更新DOM，变为2
<li> 1</li> => <li>2</li> 2. 协调器发现1需要变为2，通知渲染器，渲染器更新DOM，变为2
<li> 1</li> => <li>2</li> 3. 协调器发现1需要变为2，通知渲染器，渲染器更新DOM，变为2

将同步改为异步可中断的更新
新的 React 架构，
调度更新 =》 决定需要更新什么组件 =》 将组件更新到视图中
Scheduler => 更新 1（低优先级） 更新 2 （高优先级） （调度器和协调器都在内存中相互中断）

## React 新架构-Fiber

代数效应：函数式编程中，将副作用从函数调用中分离
Fiber 纤程架构的初衷是两个原因： 1. 更新可以中断并继续。 2.更新可以拥有优先级，高优先级可以打断低优先级。

协程可以完成 1，不能完成 2，所以 react 团队决定重新架构。

## Fiber 架构的工作原理

Fiber 的三层含义：

1. 由 stack reconciler => fiber reconciler（stack 就调用栈）

2. 作为静态的数据结构，每个 fiber 节点作为一个组件，保存该组建的类型对应的 DOM 节点等信息。
   整个应用的根结点 FiberRootNode,多次调用 react dom render,将不同的应用挂载在不同的 DOM 节点下，每个应用的都有自己的 RootFiber 根 fiber 节点，在一个页面中，可以有多个 rootFiber 但是只能又一个 FiberRootNode 来管理这些 rootFiber 节点。

   如果只是作为数据结构，那么和 jsx 没有什么区别

3. 作为动态的工作单元
   fiber 节点保存了组件需要更新的状态以及需要执行的副作用。
   Fiber 的原理： 双缓存

首屏渲染和更新最大的区别是：是否有 diff 算法
