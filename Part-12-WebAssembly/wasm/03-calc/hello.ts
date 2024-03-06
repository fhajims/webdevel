// TODO:
// move js code to two workers, one for wasm, one for js
// to keep UI responding

document.getElementById('out').innerText="Loading JS file worked.\n" 

if (!('WebAssembly' in window)) {
  document.getElementById('out').innerText += " ERROR! Please enable browser support for wasm! Then try again.\n";
}else{
  document.getElementById('out').innerText += " OK, WebAssembly is supported.\n"
}

function loadWebAssembly(filename, theImportObj={}) { // Fetch the file and compile it
     const fetchPromise =  fetch(filename)
     return fetchPromise
     .then(response => response.arrayBuffer())
     .then(buffer => WebAssembly.compile(buffer))
     .then(module => {        
      return new WebAssembly.Instance(module, theImportObj); // Create the instance.
     });
   }

function init() {
  const memory = new WebAssembly.Memory({initial: 256, maximum: 256});
  const env = {
      'abortStackOverflow': _ => { throw new Error('overflow'); },
      'table': new WebAssembly.Table({initial: 0, maximum: 0, element: 'anyfunc'}),
      'tableBase': 0,
      'memory': memory,
      '__memoryBase': 1024,
      'STACKTOP': 0,
      'STACK_MAX': memory.buffer.byteLength,
    };
 const importObject = {env};

 loadWebAssembly('a.out.wasm', importObject)
    .then(instance => {
      const exports = instance.exports;
      const theMainFunction : Function = <Function>exports.main;
      const theAddFunction : Function = <Function>exports.add;
      const theGetMaxPrimeFactor: Function = <Function>exports.getMaxPrimeFactor;
    
      var button = document.getElementById('run');
      button.addEventListener('click', function() {
        document.getElementById('out').innerText += "Calculating highes primes in wasm...";
        const a = (document.getElementById('a') as HTMLInputElement).value;
        const b = (document.getElementById('b') as HTMLInputElement).value;
        const start = performance.now() 
        for (var i = Number(b); i >= Number(a); i--  ){
          document.getElementById('out').innerText += theGetMaxPrimeFactor(i)+", ";
        }
        const stop = performance.now()
        document.getElementById('out').innerText += "\nIt took "+(stop-start)/1000+"s";

        document.getElementById('out').innerText += "\n*** and now in JS...";

        const startJS = performance.now() 
        for (var i = Number(b); i >= Number(a); i--  ){
          document.getElementById('out').innerText += getMaxPrimeFactor(i) + ", ";
        }
        const stopJS = performance.now()
        document.getElementById('out').innerText += "\nIt took "+(stopJS-startJS)/1000+"s";

      }, false);
    }
  );

}
init();

/* compare the algo in c  
int getMaxPrimeFactor(int n) {
   int i, max = -1;
   while(n % 2 == 0) {
      max = 2;
      n = n/2; //reduce n by dividing this by 2
   }
   for(i = 3; i <= sqrt(n); i=i+2){ //i will increase by 2, to get only odd numbers
      while(n % i == 0) {
         max = i;
         n = n/i;
      }
   }
   if(n > 2) {
      max = n;
   }
   return max;
}
*/
function getMaxPrimeFactor (n:number):number {
  var i
  var max = -1;
   while(n % 2 == 0) {
      max = 2;
      n = n/2; //reduce n by dividing this by 2
   }
   for(i = 3; i <= Math.sqrt(n); i=i+2){ //i will increase by 2, to get only odd numbers
      while(n % i == 0) {
         max = i;
         n = n/i;
      }
   }
   if(n > 2) {
      max = n;
   }
   return max;
}

