{
    var a = 10;
    let b = 10;
}
console.log(a);
//console.log(b);

console.log(c);
var c = 10;

//console.log(d);
//let d = 11; //ReferenceError: d is not defined

let tmp = 123;
if (true){
    //tmp = 'abc';//ReferenceError: tmp is not defined
    let tmp = 1;
}

function bar(x = y , y = 1){
    return [x, y];
}
console.log(bar(1,2));

var x = x;
let x = x;//SyntaxError: Identifier 'x' has already been declared
