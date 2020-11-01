/*
  *@params data 判断data是否是一个对象
*/
export function isObject(data){
  return typeof data === 'object' && data !== null
}

//定义属性的配置枚举方式
export function def(data,key,value){
  Object.defineProperty(data,key,{
    enumerable:false,
    configurable:false,
    value:value
  })
}