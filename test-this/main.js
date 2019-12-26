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
