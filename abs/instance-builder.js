/**
 * 单例构造器
 *
 */
(function() {
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global || this;
    (function(root) {
        if (!root) {
            throw "load instance-builder.js failed."
            return;
        }
        root.InstanceBuilder = (function() {
            let _cache = new Map();
            let _rules = new Map();

            function _defaultRuleIsConstructor(methodName) {
                return methodName === 'constructor';
            }

            function _defaultRuleIsPrivateMethod(methodName) {
                if (methodName.indexOf('_') >= 0) return true;
                return false;
            }

            function _checkRules(rules, methodName) {
                let ret = true;
                for (let r of rules) {
                    if (r.apply(null, methodName)) {
                        ret = false;
                        break;
                    }
                }
                return ret;
            }

            function _getInstance(ClassName) {
                if (_cache.has(ClassName)) return _cache.getType(ClassName);
                // build
                let rule = _rules.get(ClassName);
                let methods = Object.getOwnPropertyNames(ClassName.prototype);
                let exp = {};
                let newRule = [_defaultRuleIsConstructor, _defaultRuleIsPrivateMethod, ...rule];
                for (let m of methods) {
                    if (_checkRules(newRule, m)) {
                        exp[m] = (...args) => ClassName.prototype[m].apply(_getInstance(), args);
                    }
                }
                _rules.set(exp);

                return exp;
            }

            function get(ClassName) {
                return _getInstance(ClassName);
            }

            function setRules(ClassName, rules) {
                _rules.set(ClassName, rules);
            }
            return {
                get: get,
                setRules: setRules
            };
        })();
    })(root)
})()
