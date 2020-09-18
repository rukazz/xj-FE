    提升开发效率

- 优化 loader 配置，include 和 exclude 缩小命中 loader 要处理文件的范围，减少 loader 的处理量
- 优化 resolve.modules，此模块用来配置 webpack 去哪些目录下寻找第三方模块，默认值是['node_modules'],没有找到就回去上一级目录寻找，可以直接指定第三方模块存放位置的绝对路径减少寻找。

* 优化 resolve.alias 配置，通过配置 resolve.alias 可以让 webpack 直接使用单独的指定文件跳过耗时较长的递归解析操作。

* 优化 reslove.extensions 配置，webpack 会自动带上后缀去询问文件是否存在。设定 extensions 的值确切并且将出现次数最多的后缀放在最前面来尽快结束寻找

* 优化 module.noParse 配置，让 webpack 忽略没采用模块化文件的递归解析处理。

      HappyPack 并行构建优化

运行在 Node.js 上的 webpack 是单线程模型，无法同时处理多个任务。而 HappyPack 可以将任务分发给多个子进程并行处理来提升构建速度。

```javascript

const HappyPack = require("happypack");
module: {
    rules: [
        {
            test: /\.(es6|js)$/,
            //将对.js和.es6文件的处理转交给id为happyJs的HappyPack实例
            use: [
                {
                    loader: "happypack/loader",
                    options: {
                        id: "happyJs"
                    }
                }
            ],
            exclude: /node_modules\/(?!@(gfe|dp))/
        },
    ]
},
plugins: [
    new HappyPack({
        //用唯一的id标识当前HappyPack用来处理的一类文件
        id: "happyJs",
        //如何处理.js和.es6文件
        loaders: [
            {
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                }
            }
        ]
    }),
]
```

      模块热更新

```javascript
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
module.exports = {
  entry: {
    // 为每个入口都注入代理客户端
    main: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/dev-server',
      './src/main.js',
    ],
  },
  plugins: [
    // 该插件的作用就是实现模块热替换，实际上当启动时带上 `--hot` 参数，会注入该插件，生成 .hot-update.json 文件。
    new HotModuleReplacementPlugin(),
  ],
  devServer: {
    // 告诉 DevServer 要开启模块热替换模式
    hot: true,
  },
};
```

      提升输出质量

压缩代码

1. html 压缩 html-webpack-plugin
2. css 压缩 mini-css-extract-plugin、optimize-css-assets-webpack-plugin
3. js 压缩 uglifyjs-webpack-plugin

   按需加载

webpack 内置了强大的分隔功能去实现按需加载，举个例子：对采用了 ReactRouter 的应用进行按需加载优化。
