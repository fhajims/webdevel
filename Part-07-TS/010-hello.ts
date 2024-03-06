// Requirements: Node package manager and TypeScript compile must be installed:
//               E.g.: npm install -g typescript 
// On the command line
// a) compile TS (TypeScript) -> JS (JavaScript):
//    tsc hello.ts 
// b) run JavaScript using Node
//    node hello.js
// a+b on the fly) Alternative / Shortcut: npm install -g ts-node
//     ts-node 010-hello.ts  

let message: string = 'Just compile TS to JS (I.e, perform a transpilation).';
console.log(message)


// Optimise, i.e. automate VS-Code
// create tsconfi.json
// create tasks.json
// Run Build Task with SHIFT-CMD-B (⇧⌘B)