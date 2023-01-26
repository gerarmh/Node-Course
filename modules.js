//console.log(arguments);
//
//console.log(require('module').wrapper);
//
//////// module.exports = function
const C = require ("./test-modules-1");
 const calc1 = new C();
 console.log(calc1.add(2,5));
 /////exports
 //const calc2 = require ("./testmodules-2");
 const{add, multiply, divide} = require("./testmodules-2");
 console.log(multiply(2,5));
 console.log(divide(2,5));
 //////////carchive
 require('./testmodules-3.js')();
 require('./testmodules-3.js')();
 require('./testmodules-3.js')();
 