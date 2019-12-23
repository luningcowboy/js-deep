/*
1. apply的用法
2. call的用法
3. apply和call的区别
*/
// Function.apply(obj, args)
// obj 用来代替Function中的this对象
// args 参数传递
//
//
// Function.call(obj, [params])
// obj 代替Function中的this对象
// params 参数列表
//

function testFunc(a, b, c){
    return a + b + c;
}

console.log('testFunc.apply',testFunc.apply(null,[1,2,3]));
console.log('testFunc.apply',testFunc.apply(null,[1,2,3,4]));
console.log('testFunc.call', testFunc.call(null,1,2,3));
console.log('testFunc.call', testFunc.call(null,1,2,3,4));

function funcA(){
    console.log('funcA', this);
    funcB();
}
function funcB(){
    console.log('funcB', this);
    funcC();
}
function funcC(){
    console.log('funcC', this);
    funcD();
}
function funcD(){
    console.log('funcD', this);
}
funcA();
