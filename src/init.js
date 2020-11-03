import {initState} from './state'
import {compileToFunction} from './compiler/index'
//在原型上添加一个init方法
export  function initMixin(Vue){
  //初始化流程
  Vue.prototype._init = function(options){
    const vm  = this;
    vm.$options = options;

    initState(vm)

    //如果用户传入了el属性，需要将页面渲染出来
    //如果用户传入el,就要实现挂载流程
    if(vm.$options.el){
      vm.$mount(vm.$options.el)
    }
  }
  //挂载属性
  Vue.prototype.$mount = function(el){
        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el);

        //默认先回查找render方法，如果没有render方法会采用template,没有template会采用el的内容
        if(!options.render){
          //对模板进行编译
          let template = options.template;
          if(!template && el){
            //如果用户没有传template,但是传了el
            template = el.outerHTML;
          }
        }
        //我们需要将template转化为render方法
        const render = compileToFunction(template);

  }

}