/**
 * // solid liquid gass
 * let fsm = new FSM(
 * init: 'solid'
 * rules:[
 *  {from: 'liquid', to: 'gass', rule:bind(function, tag)},
 *  {from: 'solid', to: 'lquid', rule:bind(function, tag)},
 *  {from: 'liquid', to: 'solid', rule:bind(function, tag)},
 *  {from: 'solid', to: 'gass', rule:bind(function, tag)}, // 升华
 *  {from: 'gass', to: 'liquid', rule:bind(function, tag)},
 *  {from: 'gass', to: 'solid', rule:bind(function, tag)}, // 凝华
 * ],
 * callback:{
 *  on_liquid: bind(function, tag),
 *  on_solid: bind(function, tag),
 *  on_gass: bind(function, tag)
 * });
 */
function FSM(config) {
    let _stats = new Map();
    let _currentStat = null;
    let _config = config;

    function _parseRule(config) {
        for (let rule in config.rules) {
            let stat = _stats.get(rule['from']);
            if (!stat) {
                stat = {
                    name: rule['from'],
                    rules: [],
                    callback: {
                        function: null,
                        target: null
                    }
                };
                _stats.set(rule['from'], stat);
            }
            let tmpRule = {
                to: rule['to'],
                call: {
                    function: rule['function'],
                    target: rule['target']
                }
            }
            stat.rules.push(tmpRule);
        }
    }

    function _parseCallback(config) {
        let statNames = _stats.keys();
        for (let statName in statNames) {
            if (config.callback['on_' + statName]) {
                let stat = _stats.get(statName);
                stat.callback = {
                    function: config.callback['on_' + statName].function || null,
                    target: config.callback['on_' + statName].target || null,
                };
            }
        }
    }

    function _build() {
        _parseRule(_config);
        _parseCallback(_config);
        _currentStat = _stats.get(_config.init);
    }

    function _update() {
        if (_currentStat) {
            let tmpRules = _currentStat.rules;
            for (let rule in tmpRules) {
                let func = rule.call.function;
                let target = rule.call.target;
                if (func && target && func.apply(target)) {
                    let to = rule.to;
                    _currentStat = _stats.get(to);
                    let toFunc = _currentStat.callback.function;
                    let toTarget = _currentStat.callback.target;
                    if (toFunc && toTarget) {
                        toFunc.apply(toTarget);
                    }
                    break;
                }
            }
        } else {
            _currentStat = _stats.get(config.init);
            let toFunc = _currentStat.callback.function;
            let toTarget = _currentStat.callback.target;
            if (toFunc && toTarget) {
                toFunc.apply(toTarget);
            }
        }
    }

    _build();

    return {
        update: _update(),
        currentStat: () => _currentStat.name
    };
};
module.exports = FSM;
