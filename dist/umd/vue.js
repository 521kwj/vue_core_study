(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /*
    *@params data 判断data是否是一个对象
  */
  function isObject(data) {
    return _typeof(data) === 'object' && data !== null;
  } //定义属性的配置枚举方式

  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  }

  //我们要重写数组里的7个方法 pop push shift unshift reverse sort splice ,这七个方法会导致数组本身发生变化
  var oldArrayMethods = Array.prototype;
  var arrayMethods = Object.create(oldArrayMethods);
  var methods = ['pop', 'shift', 'push', 'unshift', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      console.log('用户使用了push方法'); // this这个this指的是数组

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayMethods[method].apply(this, args); //调用原生的数组方法
      //push unshift添加的元素有可能还是对象

      var ob = this.__ob__;
      var inserted;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args; //args是一个数组 arr.push({a:1},{b:2})

          break;

        case 'splice':
          //splice(0,1,{a:2},{a:3})
          inserted = args.slice(2);
      }

      if (inserted) {
        ob.oberverArray(inserted); //将新增属性继续监听
      }

      return result;
    };
  });

  var Oberver = /*#__PURE__*/function () {
    //vue数据层次过多，需要递归去解析对象中的属性，依次增加set和get方法
    function Oberver(value) {
      _classCallCheck(this, Oberver);

      if (Array.isArray(value)) {
        //监测数组
        //如果是数组的活并不会对索引进行检测，因为会导致性能问题，前端开发很少直接操作索引，一般使用push,shift等去操作数组
        // value.__ob__ = this; //给每一个监控的对象都增加一个__ob__属性
        def(value, '__ob__', this); // Object.defineProperty(value,'__ob__',{
        //   enumerable:false, //不可枚举
        //   configurable:false, //不可修改
        //   value:this
        // })

        value.__proto__ = arrayMethods; //如果数组里放的是对象在监控

        this.oberverArray(value);
      } else {
        //监测对象
        this.walk(value);
      }
    }

    _createClass(Oberver, [{
      key: "oberverArray",
      value: function oberverArray(data) {
        for (var i = 0; i < data.length; i++) {
          oberver(data[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        }); // for(let i=0;i<keys.length;i++){
        //   let key = keys[i];
        //   let value = data[key];
        //   // if(typeof value ==='object'){
        //   //   this.walk(value)
        //   // }
        //   defineReactive(data,key,value);
        // }
      }
    }]);

    return Oberver;
  }();

  function defineReactive(data, key, value) {
    oberver(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newVal) {
        if (newVal === value) return;
        oberver(newVal);
        console.log('值发生变化啦');
        value = newVal;
      }
    });
  }

  function oberver(data) {
    var isObj = isObject(data);

    if (!isObj) {
      return;
    }

    return new Oberver(data);
  }

  function initState(vm) {
    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    //数据初始化工作
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(this) : data; //数据劫持，用户改变数据，我希望可以得到通知=>刷新页面

    oberver(data);
  }

  function initMixin(Vue) {
    //初始化流程
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options;
      initState(vm);
    };
  }

  //vue的核心代码

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
