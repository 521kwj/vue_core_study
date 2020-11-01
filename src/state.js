import {oberver} from './oberver/index'
//vm就是Vue这个类
export function initState(vm){
  const opts = vm.$options;

  if(opts.props){
    initPtops(vm)
  }
  if(opts.methods){
    initMethod(vm)
  }
  if(opts.data){
    initData(vm)
  }
  if(opts.computed){
    initComputed(vm)
  }
  if(opts.watch){
    initWatch(vm)
  }
}

function initPtops(vm){

}

function initMethod(vm){

}
function initData(vm){
  //数据初始化工作
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(this) : data;
  //数据劫持，用户改变数据，我希望可以得到通知=>刷新页面
  oberver(data)
}

function initComputed(vm){

}

function initWatch(vm){

}