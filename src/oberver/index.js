import {isObject} from '../utils/index'
import {arrayMethods} from './array'
import {def} from '../utils/index'
class Oberver{
  //vue数据层次过多，需要递归去解析对象中的属性，依次增加set和get方法
  constructor(value){
    if(Array.isArray(value)){
      //监测数组
      //如果是数组的活并不会对索引进行检测，因为会导致性能问题，前端开发很少直接操作索引，一般使用push,shift等去操作数组
      // value.__ob__ = this; //给每一个监控的对象都增加一个__ob__属性
      def(value,'__ob__',this);
      // Object.defineProperty(value,'__ob__',{
      //   enumerable:false, //不可枚举
      //   configurable:false, //不可修改
      //   value:this
      // })
      value.__proto__ = arrayMethods;


      //如果数组里放的是对象在监控
      this.oberverArray(value)
    }else{
      //监测对象
      this.walk(value)
    }
  }
  oberverArray(data){
    for(let i=0;i<data.length;i++){
      oberver(data[i])
    }
  }
  walk(data){
    const keys = Object.keys(data);
    keys.forEach(key=>{
      defineReactive(data,key,data[key]);
    })
    // for(let i=0;i<keys.length;i++){
    //   let key = keys[i];
    //   let value = data[key];
    //   // if(typeof value ==='object'){
    //   //   this.walk(value)
    //   // }
    //   defineReactive(data,key,value);
    // }
  }
}
function defineReactive(data,key,value){
  oberver(value);
  Object.defineProperty(data,key,{
    get(){
      return value;
    },
    set(newVal){
      if(newVal===value) return;
      oberver(newVal);
      console.log('值发生变化啦')
      value = newVal;
    }
  })
}
export function oberver(data){
  const isObj = isObject(data)
  if(!isObj){
    return;
  }
  return new Oberver(data)
}