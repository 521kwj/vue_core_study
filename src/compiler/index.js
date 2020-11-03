/*
  ast语法树 是用对象来描述原生语法的
  虚拟dom 用对象来描述dom节点的

  <div id='app'>
    <p>hello</p>
  </div>
  //将这段代码转为ast
  let root = {
    tag:'div',
    attrs:[{name:'id',value:'app'}],
    parent:null,
    type:1, //元素类型
    children:[
      {
        tag:'p',
        attrs:[],
        parent:root,
        type:1,
        children:[
          {
            text:'hello',
            type:'3'
          }
        ]
      }
    ]
  }
*/


export  function compileToFunction(template){
  const ncname = `[a-zA-Z_][\\-\\.0-9a-zA-Z]`; //匹配这种字符串 abc-aaa
  const qnameCapture = `((?:${ncname})?${ncname})`; //<aaa:bbb>
  const startTagOpen = new RegExp(`^<${qnameCapture}`); //标签开头的正则 捕获的内容是标签
  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); //匹配结尾的标签
  // <div  id>
  const attribute = /^\s*([^\s"'<>])/
    


  return function render(){

  }
}
