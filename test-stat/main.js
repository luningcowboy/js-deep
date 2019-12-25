let FSM = require('./stat.js');
let fff = FSM({
  init: 'solid',
  rules:[
   {from: 'liquid', to: 'gass', rule:{function:null, tag:null}},
   {from: 'solid', to: 'lquid', rule:{function:null, tag:null}},
   {from: 'liquid', to: 'solid', rule:{function:null, tag:null}},
   {from: 'solid', to: 'gass', rule:{function:null, tag:null}}, // 升华
   {from: 'gass', to: 'liquid', rule:{function:null, tag:null}},
   {from: 'gass', to: 'solid', rule:{function:null, tag:null}}, // 凝华
  ],
  callback:{
   on_liquid: {function:null, tag:null},
   on_solid: {function:null, tag:null},
   on_gass: {function:null, tag:null}
  }
});
console.log(fff);
