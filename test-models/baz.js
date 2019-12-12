//module foo from "foo";
//module bar from "bar";
//import * as foo from "./foo";
//import * as bar from "./bar";
// node 环境下直接像上面那样写会报错，node只支持部分es6特性，import是
// 不支持的
// 解决方案:
// 1. 使用require替换import
// 2. 使用babel将es6转换为es5
// 检测node对es6的支持情况
// npm install -g es-checker
// es-checker
console.log(bar.hello("rhino"));
foo.awesome();
