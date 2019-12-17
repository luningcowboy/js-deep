理论上来说js中类型判断是一个不靠谱的东西。
通常用作类型判断的方法:`instanceof`和`typeof`。
## `typeof`
返回一个字符串，用来说明变量的数据类型.
返回结果:`number, boolean, string, function, object, undefined`
通常用`typeof`判断一个对象是否存在:
```js
if(typeof a != 'undefined'){
    // do something
}
if(a){
    // do something
    // a 不存在可能报错
}
```
局限性:
`Array,Null`等特殊对象使用`typeof`一律返回`object`,这个很坑爹。
## `instanceof`
用来判断一个变量是否属于某个对象的实例。
```js
a instanceof b ? console.log("true") : console.log("false");
let a = [1, 2, 3];
console.log(a instanceof Object); // true
console.log(a instanceof Array); // true
```
上面的例子中`a instanceof Object`和`a instanceof Array`都是`true`,这是因为`Array`是`Object`的子类.

## 其他的类型判断
### 使用`contructor`判断
```js
[1, 2].__proto__.constructor === Array; // true
[1, 2].__proto__.constructor === Object; // false
"str".__proto__.constructor === String; // true
true.__proto__.constructor === Boolean; // true
window.testF = function(){console.log("testF")}; // 函数
testF.__proto__.constructor === Function; // true
window.testF2 = ()=>console.log('testF2'); // 函数表达式
testF2.__proto__.constructor === Function; // true
NaN.__proto__.constructor === Number; // true
1.__proto__; // Uncaught SyntaxError: Invalid or unexpected token
{"a":1}.__proto__;// Uncaught SyntaxError: Unexpected token ':'
```
### 使用`Object.prototype.toString.call()`判断
```js
Object.prototype.toString.call(NaN) // "[object Number]"
Object.prototype.toString.call([1,2]) // "[object Array]"
// 函数表达式
Object.prototype.toString.call(()=>console.log(1)) // "[object Function]"
// 函数声明
Object.prototype.toString.call(window.testF) // "[object Function]"
Object.prototype.toString.call("str") // "[object String]"
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call(null) // "[object Null]"
```
### 数组特殊判断
**这个接口是ES5之后才有的，游戏开发的话，应该没问题，使用的一般是ES5和ES6规范**
```js
Array.isArray([]) // true
```
### NaN特殊判断
```js
isNaN(number)
```

### 测试

```js
function testFunc() {
    console.log("testFunc");
}
let testArr = {
    "NaN": NaN,
    "null": null,
    "undefined": undefined,
    "1": 1,
    "[1,2]": [1, 2],
    "testFunc": testFunc,
    "testFunc2": () => console.log("testFunc2"),
    "obj": {
        "a": 1
    },
    "boolean": true,
    "string": "strxxxx"
};
for (let k in testArr) {
    try {
        console.log("typeof ==>", k, typeof testArr[k]);
        console.log("instanceof Object ==>", k, testArr[k] instanceof Object);
        console.log("Object.prototype.toString.call() ==>", k, Object.prototype.toString.call(testArr[k]));
        console.log("constructor ==>", k, testArr[k].__proto__.constructor);
    }
    catch(e){
        console.log(e);
    }
    console.log("");
}
```
```
// 下面是输出结果
typeof ==> 1 number
instanceof Object ==> 1 false
Object.prototype.toString.call() ==> 1 [object Number]
constructor ==> 1 function Number() { [native code] }

typeof ==> NaN number
instanceof Object ==> NaN false
Object.prototype.toString.call() ==> NaN [object Number]
constructor ==> NaN function Number() { [native code] }

typeof ==> null object
instanceof Object ==> null false
Object.prototype.toString.call() ==> null [object Null]
TypeError: Cannot read property '__proto__' of null
    at Object.<anonymous> (/Users/tu/self/learn/learn-js/test-types/main.js:23:54)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:191:16)
    at bootstrap_node.js:612:3

typeof ==> undefined undefined
instanceof Object ==> undefined false
Object.prototype.toString.call() ==> undefined [object Undefined]
TypeError: Cannot read property '__proto__' of undefined
    at Object.<anonymous> (/Users/tu/self/learn/learn-js/test-types/main.js:23:54)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
    at Function.Module.runMain (module.js:693:10)
    at startup (bootstrap_node.js:191:16)
    at bootstrap_node.js:612:3

typeof ==> [1,2] object
instanceof Object ==> [1,2] true
Object.prototype.toString.call() ==> [1,2] [object Array]
constructor ==> [1,2] function Array() { [native code] }

typeof ==> testFunc function
instanceof Object ==> testFunc true
Object.prototype.toString.call() ==> testFunc [object Function]
constructor ==> testFunc function Function() { [native code] }

typeof ==> testFunc2 function
instanceof Object ==> testFunc2 true
Object.prototype.toString.call() ==> testFunc2 [object Function]
constructor ==> testFunc2 function Function() { [native code] }

typeof ==> obj object
instanceof Object ==> obj true
Object.prototype.toString.call() ==> obj [object Object]
constructor ==> obj function Object() { [native code] }

typeof ==> boolean boolean
instanceof Object ==> boolean false
Object.prototype.toString.call() ==> boolean [object Boolean]
constructor ==> boolean function Boolean() { [native code] }

typeof ==> string string
instanceof Object ==> string false
Object.prototype.toString.call() ==> string [object String]
constructor ==> string function String() { [native code] }
```
### 结论
js中最好的类型判断方法应该是使用`Object.prototype.toString.call()`来判断，因为
这种方法能判断大部分类型，唯一不能区分的是`NaN`和`Number`,因为`NaN`也是`Number`.
我们可以跟`isNaN(number)`组合使用。
