import {initState} from './state'
//在原型上添加一个init方法
export  function initMixin(Vue){
  //初始化流程
  Vue.prototype._init = function(options){
    const vm  = this;
    vm.$options = options;

    initState(vm)
  }
}