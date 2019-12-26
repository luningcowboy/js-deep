let root = typeof global !== 'undefined' ? global : window;
function foo(){
    console.log(this.a);
    console.log('g',this === root);
    console.log('o',this === o);
    console.log('p', this === p);
}
var a = 2;
var o = {a: 3, foo: foo};
var p = {a: 4};
o.foo(); // 3 this === o
(p.foo = o.foo)(); // 2  node: undefined this === global
// 解释下:
// 浏览器:
// p.foo = o.foo 返回的是foo这个函数，所以 (p.foo = o.foo)() 等同于foo()
// 在浏览器中a的上下文应该是window,所以，a会绑定到window下，this也是指向
// window的作用域,所以，最后输出的是2
// nodejs:
// 输出undefined说明，这段代码的this绑定并不是在全局变量global下的，当前的
// this指向的是一个{}对象，也就是说当前作用域啥都没有
// 我们在foo内/外都输出了this, 在foo内的this是global,而foo外的this并不是global
// node中a并没有默认绑定到global下
// 我的猜想:
// node运行的时候，自己给作用域不明确的代码创建了一个临时作用域，这部分内容会绑定
// 到临时作用域而不是全局对象上
// 上面的原因是node的代码默认应该是采用的严格模式，直接将作用域绑定到了undefined

if(!Function.prototype.softBind){
    Function.prototype.softBind = obj=>{
        let fn = this;
        let curried = [].slice.call(arguments, 1);
        let bound = ()=>{
            return f.apply((!this || this === root )? obj : this, curried.concat.apply(curried, arguments));
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    };
}
function foo1(){
    console.log("name:", this.name);
}
let obj = {name: 'o1'},
    obj2 = {name: 'o2'},
    obj3 = {name: 'o3'};
let fooOBJ = foo1.softBind(obj);
fooOBJ();
obj2.foo = foo1.softBind(obj);
obj2.foo();

fooOBJ.call(obj3);
setTimeout(obj2.foo, 10);



