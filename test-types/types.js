const TypeValues = {
    "Number": Object.prototype.toString.call(1),
    "String": Object.prototype.toString.call("1"),
    "Function": Object.prototype.toString.call(() => console.log("")),
    "Null": Object.prototype.toString.call(null),
    "Undefined": Object.prototype.toString.call(undefined),
    "Array": Object.prototype.toString.call([]),
    "Object": Object.prototype.toString.call({}),
    "Boolean": Object.prototype.toString.call(true),
    "NaN": Object.prototype.toString.call(NaN)
};

function _isEqualPrototype(v, type) {
    return Object.prototype.toString.call(v) === TypeValues[type];
}

function isNumber(v) {
    return _isEqualPrototype(v, 'Number') && !isNaN(v);
}

function isNaN(v) {
    return isNaN(v);
}

function isString(v) {
    return _isEqualPrototype(v, "String");
}

function isObject(v) {
    return _isEqualPrototype(v, "Object");
}

function isArray(v) {
    return _isEqualPrototype(v, "Array");
}

function isUndefined(v) {
    return _isEqualPrototype(v, "Undefined");
}

function isFunction(v) {
    return _isEqualPrototype(v, "Function");
}

function isBoolean(v) {
    return _isEqualPrototype(v, "Boolean")
}

function isNull(v) {
    return _isEqualPrototype(v, "Null");
}

if (!hoolai.TypeCheck) {
    hoolai.TypeCheck = {
        isNaN,
        isNumber,
        isString,
        isObject,
        isArray,
        isUndefined,
        isFunction,
        isBoolean,
        isNull
    };
}
