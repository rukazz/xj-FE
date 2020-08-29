// var Cancel = require('./Cancel');
function Cancel (message) {
  this.message = message
}

function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      return;
    }
    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

// 这里可以看清楚source函数的真面目
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    // c 就是CancelToken中给executor传入的cancel方法
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;