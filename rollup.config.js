import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input:'./src/index.js', //以哪个文件作为打包入口
  output:{
    file:'dist/umd/vue.js', //出口文件
    name:'Vue', //指定打包后全局变量的名字
    format:'umd', //统一模块规范
    sourcemap:true, //es6->es5 开启源码调试，可以找到源码的报错位置

  },
  plugins:[ //使用插件
    babel({
      exclude:'node_module/**'
    }),
    process.env.ENV==='development'?serve({
      open:true,
      openPage:'/public/index.html',
      port:3000,
      contentBase:''
    }):null
  ]
}