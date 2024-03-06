document.getElementById('out').innerText = "Loading JS file worked.\n";
if (!('WebAssembly' in window)) {
    document.getElementById('out').innerText += " ERROR! Please enable browser support for wasm! Then try again.\n";
}
else {
    document.getElementById('out').innerText += " OK, WebAssembly is supported.\n";
}
// Fetch the file and compile it
function loadWebAssembly(filename, theImportObj) {
    if (theImportObj === void 0) { theImportObj = {}; }
    var fetchPromise = fetch(filename);
    return fetchPromise
        .then(function (response) { return response.arrayBuffer(); })
        .then(function (buffer) { return WebAssembly.compile(buffer); })
        .then(function (module) {
        // Create the instance.
        return new WebAssembly.Instance(module, theImportObj);
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
        var sumIt = exports.sumThree;
        var button = document.getElementById('run');
        button.addEventListener('click', function () {
            document.getElementById('out').innerText += "\n * Wasm:";
            var a = document.getElementById('a').value;
            var b = document.getElementById('b').value;
            var c = document.getElementById('c').value;
            document.getElementById('out').innerText +=
                "\n *  wasm 'sumIt(" + a + "," + b + "," + c + ")' returned " + sumIt(a, b, c);
        }, false);
    });
}
init();
