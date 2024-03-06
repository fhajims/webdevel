[Home](../README.md)

# Web Assembly (wasm)

Run code with maximum performance (and security) in Browser environments.

## Motivation = Performance

WebAssembly is no replacement for JavaScript. Run performance critical code in wasm.

### Why not use JavaScript

* JS is *possibly* slow (it depends)
	* execution
		
		> loading code -> parsing -> interpretation -> optional multiple times: profile then JIT compilation/optimisation -> execution -> garbage collection
	* For example, slow on polymorphic and megamorphic property lookup (propery of object might / might not exist). E.g., slow for

		```JavaScript
		const homeLocation = {
			longitude: 47.3, 
			altitude: 320.0};
		const workLocation = {
			longitude: 45,2};
		...
		const pois = [homeLocation, workLocation,...]
		const getLongitude = (poi) => poi.longitude;
		```
	 
	* For example, *Holey Array*s are slow: ```const arr = new Array(5)``` ( returns ```[ <5 empty items> ]```)  
* JS can be very weird. Check the results:
	* ```[] + {}```  ( returns ```[object Object]```)
	* ```{} + []```  ( returns ```0```)
	* ```[] + {} === {} + []``` ( returns ```true```)
	* Note: differences between execution in node and in the browser console.
* JS problems:
	* Not type-safe, runtime exceptions, ...


## Alternatives to wasm: asm.js

asm.js is a **subset of JavaScript**.

* Alternative - asm.js
	* produces JavaScript which can be optimised by the browser (if the browser supports it) 

## Performance and Security of wasm

* wasm is fast
	* execution
	
	 	> loading/streaming code -> decode -> excecution
	
	* **binary** format (small size, faster loading)
	* intermediate representation (native execution speed: **decode / compile+optimise / execute**)


* WebAssembly (wasm) is safe and secure
	* memory-safe 
		* isolated, **linear memory**, fixed max. size, zero-initialised, bound checks 
			* (i.e. no need for data execution prevention)
			* (no need for stack smashing prevention)
		* stack machine, no *pointers*, *traps* to terminate execution on unexpected behaviour, thread-safe, ..
	* sandboxed environment
	* type safe (Types: ```i32, f32 and i64, f64```)
		* compile to wasm
		* (-) no support for dynamic languages
	* Immutable compiled code
	* Control-flow integrity (CFI)
	* No buffer overflows


## How WebAssembly (wasm) works

* Executed in a **stack machine**
* Executes code *near native*
* Uses modules
* S-expressions
* JS embedding
	* Wasm store
	* Object cache
	* Namespaces, exported functions, error objects
* Streaming module 
	* Compile 
	* Instantiate  

## Evolving wasm 

* under development
	* Garbage collection 
	* Threads
	* Source maps
	* Memory inspection


## wasm and JavaScript

WebAssembly communicates (passes data via **shared array buffer**) with JavaScript.

* pass data forth and back (this *boundary crossing* might be slow)


## Rust and WebAssembly

* Why Rust
	* Memory safety, productivity (modern language, friendly compiler, tooling, *crates* package-manager)
	
* Toolchain
	* Use helper: *wasm-pack*, combine with *webpack*
	* wrapper: *wasm-bindgen*

[Next part (Security)](../Part-13-Security/study-material--security.md)