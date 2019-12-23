let Lock = require('./lock.js');
console.log(Lock);
Lock.activeLock("a", 5);
Lock.update(0.1)
console.log('value',Lock.getLastTime('a', 5));
