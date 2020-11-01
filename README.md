## 一.使用Rollup搭建开发环境
### 什么是rollup?
> rollup是一个javascript模块打包器，可以将小块代码编译成大块复杂的代码，rollup.js更专注于javascript类库打包（开发应用时使用webpack,开发库时使用rollup）

### 环境搭建
npm install @babel/core @babel/preset-env rollup rollup-plugin-babel rollup-plugin-serve cross-env --save-dev

@babel/core:用于es6语法转es5语法
@babel/preset-env（预设）:用于将es6更高级的语法专为低级语法
rollup-plugin-babel?
rollup-plugin-serve:用于在本地启动一个静态服务
cross-env:用于设置环境变量的

### rollup.config.js 是rollup的配置文件，在这个文件里支持es6的语法

## package.json
"scripts": {
    "build:dev":"rollup -c" //-c指的是使用 rollup.config.js进行打包
},
