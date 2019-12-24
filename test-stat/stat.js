/**
 * // solid liquid gass
 * let fsm = new FSM(
 * init: 'solid'
 * stats:[
 *  {from: 'liquid', to: 'gass', rule:bind(function, tag)},
 *  {from: 'solid', to: 'lquid', rule:bind(function, tag)},
 *  {from: 'liquid', to: 'solid', rule:bind(function, tag)},
 *  {from: 'solid', to: 'gass', rule:bind(function, tag)}, // 升华
 *  {from: 'gass', to: 'liquid', rule:bind(function, tag)},
 *  {from: 'gass', to: 'solid', rule:bind(function, tag)}, // 凝华
 * ],
 * callback:{
 *  onLiquid: bind(function, tag),
 *  onSolid: bind(function, tag),
 *  onGass: bind(function, tag)
 * });
 */
function FSM(){
    function _build(config){

    }

    return {
        build: _build,
    }
}
