// we set some value to an "Optional" (Type is s'tring' or type is 'null')
let cmdlineargDbgLvl : string | null = "error";
cmdlineargDbgLvl = null

// Optional Chaining: ?.
// we avoid runtime crash: TypeError: Cannot read property 'toUpperCase' of null 
// let v = cmdlineargDbgLvl.toUpperCase() 
let currVal = cmdlineargDbgLvl?.toUpperCase() 
console.log(`We currently got debug level = '${currVal}'.`)



// Nullish Coalescing: ??
let debugLevel = cmdlineargDbgLvl ?? "warn" 
console.log(`Debug level = '${debugLevel}'.`)

// Assertions: assert(...)
// Get/set accessors: ...
// Properties on functions: ...

// Rest of the arguments: 
function sum(startVal,...listOfNumber): number{
    let res = startVal
    listOfNumber.forEach(i => res+=i )
    return res 
}
let res = sum(200,2,3,4)
console.log( ` The result is ${res}.` )

// Spread parameters: ...
// Modules, imports, namespaces: ...
// Type guards: ...
// Let, const scoping: ...
// Promises with async await: ...
