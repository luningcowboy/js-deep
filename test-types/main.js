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
