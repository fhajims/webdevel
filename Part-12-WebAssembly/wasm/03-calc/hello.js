// TODO:
// move js code to two workers, one for wasm, one for js
// to keep UI responding
document.getElementById('out').innerText = "Loading JS file worked.\n";
if (!('WebAssembly' in window)) {
    document.getElementById('out').innerText += " ERROR! Please enable browser support for wasm! Then try again.\n";
}
else {
    document.getElementById('out').innerText += " OK, WebAssembly is supported.\n";
}
function loadWebAssembly(filename, theImportObj) {
    if (theImportObj === void 0) { theImportObj = {}; }
    var fetchPromise = fetch(filename);
    return fetchPromise
        .then(function (response) { return response.arrayBuffer(); })
        .then(function (buffer) { return WebAssembly.compile(buffer); })
        .then(function (module) {
        return new WebAssembly.Instance(module, theImportObj); // Create the instance.
    });
}
function init() {
    var memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
    var env = {
        'abortStackOverflow': function (_) { throw new Error('overflow'); },
        'table': new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' }),
        'tableBase': 0,
        'memory': memory,
        '__memoryBase': 1024,
        'STACKTOP': 0,
        'STACK_MAX': memory.buffer.byteLength
    };
    var importObject = { env: env };
    loadWebAssembly('a.out.wasm', importObject)
        .then(function (instance) {
        var exports = instance.exports;
        var theMainFunction = exports.main;
        var theAddFunction = exports.add;
        var theGetMaxPrimeFactor = exports.getMaxPrimeFactor;
        var button = document.getElementById('run');
        button.addEventListener('click', function () {
            document.getElementById('out').innerText += "Calculating highes primes in wasm...";
            var a = document.getElementById('a').value;
            var b = document.getElementById('b').value;
            var start = performance.now();
            for (var i = Number(b); i >= Number(a); i--) {
                document.getElementById('out').innerText += theGetMaxPrimeFactor(i) + ", ";
            }
            var stop = performance.now();
            document.getElementById('out').innerText += "\nIt took " + (stop - start) / 1000 + "s";
            document.getElementById('out').innerText += "\n*** and now in JS...";
            var startJS = performance.now();
            for (var i = Number(b); i >= Number(a); i--) {
                document.getElementById('out').innerText += getMaxPrimeFactor(i) + ", ";
            }
            var stopJS = performance.now();
            document.getElementById('out').innerText += "\nIt took " + (stopJS - startJS) / 1000 + "s";
        }, false);
    });
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
function getMaxPrimeFactor(n) {
    var i;
    var max = -1;
    while (n % 2 == 0) {
        max = 2;
        n = n / 2; //reduce n by dividing this by 2
    }
    for (i = 3; i <= Math.sqrt(n); i = i + 2) { //i will increase by 2, to get only odd numbers
        while (n % i == 0) {
            max = i;
            n = n / i;
        }
    }
    if (n > 2) {
        max = n;
    }
    return max;
}
