//我们要重写数组里的7个方法 pop push shift unshift reverse sort splice ,这七个方法会导致数组本身发生变化

let oldArrayMethods = Array.prototype;

export let arrayMethods = Object.create(oldArrayMethods);
const methods = [
  'pop',
  'shift',
  'push',
  'unshift',
  'reverse',
  'sort',
  'splice'
]
methods.forEach(method=>{
  arrayMethods[method] = function(...args){
    console.log('用户使用了push方法');
    // this这个this指的是数组
    const result = oldArrayMethods[method].apply(this,args); //调用原生的数组方法
    //push unshift添加的元素有可能还是对象
    let ob = this.__ob__;
    let inserted;
    switch(method){
      case 'push':
      case 'unshift':
        inserted = args; //args是一个数组 arr.push({a:1},{b:2})
        break;
      case 'splice': //splice(0,1,{a:2},{a:3})
        inserted = args.slice(2)
      default:
        break;

    }
    if(inserted){
      ob.oberverArray(inserted) //将新增属性继续监听
    }
    return result;
  }
})