class A{
    constructor(){}
    funcA1(){}
    funcA2(){}
    funcA3(){}
}
class B extends A{
    constructor(){}
    funcB1(){}
    funcB2(){}
    funcB3(){}
}
console.log(B.prototype);
let methods = Object.getOwnPropertyNames(B.prototype);
console.log(methods);
let methods2 = Object.getOwnPropertyNames(A.prototype);
console.log(methods2);
