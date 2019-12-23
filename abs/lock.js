/**
 * 简单的逻辑锁
 * 使用:
 * 1. 在scene的update中加入:
 *    LogicLock.update(dt)
 *    注意: 只需要在scene的update中加入一次就可以了，加入多了，时间就不准确了
 *    锁的时间不是一个准确时间，跟帧率相关
 * 2. 需要加锁的地方，如下调用
        let lockTag = 'city_stat_attack';
        if (LogicLock.isLocked(lockTag)){
            return;
        }
        LogicLock.activeLock(lockTag, 5, false);
      注意:
      上面关于锁的使用的代码理论上应该在需要加锁的代码块的最前面，因为，这段
      代码会屏蔽之后的代码，如果，放在代码块中间，那么，这个操作就太骚了，我
      感觉这时候你的代码也是可以拆分成两个接口来执行的。
 */
class LogicLock {
    constructor() {
        this._lockMap = new Map();
    }
    // 激活一个默认锁，有的情况下设置为锁住，没有的情况下
    // 创建一个默认锁住的锁
    activeLock(tag, time) {
        if (this._hasLock(tag)) {
            this._resetLock(tag, time);
        } else {
            this._addLock(tag, time);
        }
    }
    // 1. 是否有这个锁
    // 2. 这个锁的状态是什么
    isLocked(tag) {
        if (!this._hasLock(tag)) {
            return false;
        }

        let v = this._lockMap.get(tag);

        return v.locking;
    }
    // 锁的更新，确保只有一个外部调用
    update(dt) {
        this._refreshPassTime(dt);
        this._refreshLockStat();
        this._resetPassTime();
    }
    destroy() {
        this._lockMap.clear();
        delete this._lockMap;
    }
    getLastTime(tag, defaultValue) {
        if (this._lockMap.has(tag)) {
            let v = this._lockMap.get(tag);
            return parseInt(v.lockTime - v.passTime);
        }
        return defaultValue;
    }
    _hasLock(tag) {
        return this._lockMap.has(tag);
    }
    _addLock(tag, time) {
        if (this._hasLock(tag)) {
            //hoolai.LOGW('logic_lock.js', `Plase call LogicLock.activeLock to active ${tag} lock.`);
            return;
        }
        this._lockMap.set(tag, {
            lockTime: time,
            passTime: 0,
            locking: true,
        });
    }
    _resetLock(tag, time) {
        if (!this.isLocked(tag)) {
            let v = this._lockMap.get(tag);
            v.locking = true;
            v.passTime = 0;
            this._lockMap.set(tag, v);
        }
    }
    _refreshPassTime(dt) {
        for (let [k, v] of this._lockMap) {
            if (v.locking) {
                v.passTime += dt;
                this._lockMap.set(k, v);
            }
        }
    }
    _refreshLockStat() {
        for (let [k, v] of this._lockMap) {
            if (v.passTime >= v.lockTime) {
                v.locking = false;
                this._lockMap.set(k, v);
            }
        }
    }
    _resetPassTime() {
        for (let [k, v] of this._lockMap) {
            if (!v.locking) {
                v.passTime = 0;
                this._lockMap.set(k, v);
            }
        }
    }
}

let _instance = null;

function _getInstance() {
    if (!_instance) _instance = new LogicLock();
    return _instance;
}

function _destroy() {
    if (_instance) _instance.destroy();
    _instance = null;
}

function _isPrivateMethod(methodName) {
    if (methodName.indexOf('_') >= 0) return true;
    return false;
}
let methods = Object.getOwnPropertyNames(LogicLock.prototype);
let exp = {};
for (let m of methods) {
    if (!_isPrivateMethod(m) && m !== 'constructor') {
        exp[m] = (...args) => LogicLock.prototype[m].apply(_getInstance(), args);
    }
}

module.exports = exp;
