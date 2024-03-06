// You might copy/paste the Uint8Arry from 
// https://wasdk.github.io/WasmFiddle/ 
//const wasmCode = new Uint8Array([0,97,115,109,1,0,0,0,1,133,128,128,128,0,1,96,0,1,127,3,130,128,128,128,0,1,0,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,145,128,128,128,0,2,6,109,101,109,111,114,121,2,0,4,109,97,105,110,0,0,10,138,128,128,128,0,1,132,128,128,128,0,0,65,42,11]);
const wasmCode = new Uint8Array([0,97,115,109,1,0,0,0,1,133,128,128,128,0,1,96,0,1,127,3,130,128,128,128,0,1,0,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,145,128,128,128,0,2,6,109,101,109,111,114,121,2,0,4,109,97,105,110,0,0,10,139,128,128,128,0,1,133,128,128,128,0,0,65,253,15,11]);

const wasmModule = new WebAssembly.Module(wasmCode);

// Just, because we are curious
console.log(WebAssembly.Module.exports(wasmModule)) 
// prints: [{name: "memory", kind: "memory"}, {name: "main", kind: "function"}] (2) 

const importObj = {}

// add breakpoint to check the objects :)
const wasmInstance = new WebAssembly.Instance(wasmModule, importObj );

// We tell TypeScript compiler, that main is a function (exported by WebAssembly)
const c_func: Function = <Function>wasmInstance.exports.main

const result = c_func()
console.log( "The function main returned: '" +  result + '"' )

document
  .getElementById('out')
  .innerText = "The static wasm code returned: " + c_func()