## Electron

```javascript
function createWebSocketConnection(taskId: string) {
  return new Promise((resolve, reject) => {
    const protocol = window.location.protocol.indexOf('https') !== -1 ? 'wss' : 'ws';
    const socket = new WebSocket(
      `${protocol}://${defaultConfig.wshost}:${defaultConfig.wsport}/task/block/${taskId}`,
    );
  });
}

function* listenForSocketMessages(action: ReturnType<typeof pollingTransctiptionAction.request>) {
  const { taskId } = action.payload;

  let socket;
  let socketChannel;

  try {
    // socket = yield call(createWebSocketConnection(taskId))
  }
}
```

ELECTRON 的 IPC 机制？

- webdriverJS

- 主进程
  运行 package.json 里 main 脚本的进程被称为主进程。

- 渲染进程
  由于 Electron 使用 Chromium 来展示页面，所以 Chromium 的多进程结构也被充分利用。每个 Electron 的页面都在运行着自己的进程，这样的进程我们称之为渲染进程。
- 主进程与渲染进程的区别
  主进程使用 BrowserWindow 实例创建网页。每个 BrowserWindow 实例都在自己的渲染进程里运行着一个网页。当一个 BrowserWindow 实例被销毁后，相应的渲染进程也会被终止。

package.json 里 electrn 应用

```javascript
var app = require('app'); // 控制应用生命周期的模块。
var BrowserWindow = require('browser-window'); // 创建原生浏览器窗口的模块

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // 加载应用的 index.html
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // 打开开发工具
  mainWindow.openDevTools();

  // 当 window 被关闭，这个事件会被发出
  mainWindow.on('closed', function () {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 但这次不是。
    mainWindow = null;
  });
});
```
