
document.getElementById('out').innerText="Loading JS file worked.\n" 

if (!('WebAssembly' in window)) {
  document.getElementById('out').innerText += " ERROR! Please enable browser support for wasm! Then try again.\n";
}else{
  document.getElementById('out').innerText += " OK, WebAssembly is supported.\n"
}

// Fetch the file and compile it
function loadWebAssembly(filename, theImportObj={}) { 
     const fetchPromise =  fetch(filename)
     return fetchPromise
     .then(response => response.arrayBuffer())
     .then(buffer => WebAssembly.compile(buffer))
     .then(module => {        
        // Create the instance.
      return new WebAssembly.Instance(module, theImportObj);
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
      const sumIt : Function = <Function>exports.sumThree;
    
      var button = document.getElementById('run');
      button.addEventListener('click', function() {
        document.getElementById('out').innerText += "\n * Wasm:";
        const a = (document.getElementById('a') as HTMLInputElement).value;
        const b = (document.getElementById('b') as HTMLInputElement).value;
        const c = (document.getElementById('c') as HTMLInputElement).value;
        document.getElementById('out').innerText += 
            "\n *  wasm 'sumIt("+a+","+b+","+c+")' returned " +sumIt(a,b,c);
      }, false);
    }
  );

}
init();

