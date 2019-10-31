## `let`和`var`
`let`类似`var`的用法，但是，所声明的变量，只在`let`命令所在的代码块内有效。
```javascript
{
    var a = 10;
    let b = 10;
}
console.log(a);
//console.log(b); //ERROR: b is not defined
```
上面的代码中`console.log(b)`运行会报错，提示`b is not defined`.
### 关于变量提升
`var`命令会发生变量提升的现象，即变量可以在声明之前使用，值为`undefined`.这有点不和逻辑，
为了修改这种问题，`let`修改了这种语法行为，它所声明的变量只能在声明后使用，否则会报错。
```javascript
console.log(c); //undefined
var c = 10;

console.log(d);
//let d = 11; //ReferenceError: d is not defined
```
### 暂时性死区
只要块级作用域内存在`let`命令，它所声明的变量就"绑定"(binding)这个区域，不再受外界影响。
```javascript
let tmp = 123;
if (true){
    tmp = 'abc';//ReferenceError: tmp is not defined
    let tmp = 1;
}
```
在代码块内，使用`let`命令声明变量之前，该变量是不可以用的，这在语法上称之为“暂时性死区”(temporal dead zone , TDZ).
#### 隐蔽的TDZ
```javascript
function bar(x = y , y = 1){
    return [x, y];
}
console.log(bar(1,2));
```
上面的代码应该是会报错的，因为，x在y使用前调用了y,也就是y还没有声明就调用了y.但是某些时候也不报错，跟底层实现有关系。
```javascript
let x = x;//SyntaxError: Identifier 'x' has already been declared
```
上面的代码也会报错，因为，调用的时候x还没有声明。
#### 不允许重复声明
```javascript
let a = 1;
let a = 2;//报错

function func(arg){
    let arg;//报错
}
```
`let`不允许在相同的作用域内，重复声明同一个变量。
我在node中测试就没有报错，不过还是避免这种使用为好。
