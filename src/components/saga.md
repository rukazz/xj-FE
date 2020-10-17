## 使用 Channels

- yield take(ACTION)
  创建一个 Effect 描述信息，用来命令 middleware 从指定的 Channel 中等待一个特定消息。如果 channel 已经被关闭，那么 Generator 将以与上面 take(pattern)所描述一致的步骤马上终止。
- yield fork(fn, ...args) => yield fork(worker)
  创建一个 Effect 描述信息，用来命令 middleware 以非阻塞调用的形式执行 fn。
  参数:
  - fn: Function 一个 Generator 函数，或返回 Promise 的普通函数
  - args: Array<any> -传递给 fn 的参数数组
    返回一个 Task 对象

### Task 对象

Task 接口指定了通过 fork, middleare.run 或 runSaga 运行 Saga 的结果
| 方法 | 返回值 |
| ---- | ---- |
| task.isRunning() | 若任务还未返回或抛出了一个错误则为 true
task.isCancelled() | 若任务已被取消则为 true
task.result()| 任务的返回值。若任务仍在运行中则为 `undefined`
task.error()| 任务抛出的错误。若任务仍在执行中则为 `undefined`
task.done 一个| Promise，以下二者之一：
以任务的返回值 |resolve
以任务抛出的错误| reject
task.cancel()| 取消任务（如果任务仍在执行中）
