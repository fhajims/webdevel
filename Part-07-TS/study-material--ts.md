[Home](../README.md)

# TypeScript (TS)

Type-safe coding prevents many (classes of) errors up-front.

## Drawbacks of JavaScript

* Suffers from historical design decsisions. Originally many features (**dynamic typing**, no namespaces, hoisting, no support for conventional oop) have not been included and have been added over the years, or will be added in the future. 
* Without type-safety the support for IDEs is limited.

## Selected Features of TypeScript

* TypeScript is **strongly typed**, so
* many errors can be detected at **compile time**.
* Integrated Development Environments (IDEs) provide optimised **autocompletion**
* (-) transpiling to JavaScript is necessary.

* Advanced programming language features:
	
	```typescript
	type Location = {
	  longitude: number,
	  latitude: number,
	  altitude?: number
	};
	```
	
	
	* **Optional Chaining**: ```?.```

		```typescript
		if (gpsLoc?.altitude > 3000){
			// on the mountains
			... 
		}
		```

	* **Nullish Coalescing**: ```??```


		```typescript
		function serializeJSON(value: unknown, gpsLoc: Location): string {
		  const alt = gpsLoc.altitude ?? 0;
		  // ...
		}
		```

	* **Type Assertions**: 
	
		```typescript
		let someNumber: any = 111;   
		let cityCode = <number> someNumber; 
		```
		
	* **Get/set accessors**: 
		
		```typescript
		get circumfence(){ return ...}
		set radius(r){ this._radius = ...}
		```
	* **Properties on functions**: ```...``` 

		```typescript
		const listener = (event, ...args) => {
		    console.log(message);
		    callback(event, ...args);
		};
		listener.disabled = true;
		...
		const activeListeners = listeners.filter(x => !x.disabled);
		```
	* **Spread operator**: Three dots ```...``` are used for destructing (also to allow the use for variables for the *remaining arguments*)

		```typescript
		const loc2D = {longitude: 1, latitude: 2};
		const loc3D = {...loc2D, altitude: 3};
		```
	* **Namespaces**: More than modules. (And no global scope for variable declarations, like in JS) 

		E.g. file ```Slideshow.ts```

		```typescript
		namespace slideshow {   
		   export namespace withLocationBasedService {   
		      export class GPS {   
		      	 private distance(a:Location,b:Location):number{....}
		         public calculateDistance(curr:Location, home: Location) {   
		            return distance(curr,home);   
		         }   
		      }   
		   }   
		}  
		```
		
		```typescript
		///<reference path="./Slideshow.ts"/>
		let route = new slideshow. withLocationBasedService.GPS(); 
		console.log("Distance: "" + route. calculateDistance(Loc(currLat,currLong), Loc(homeLat,homeLong)));
		```

	* **Type guards**: ```if (x instanceof T){ x....```

		Within a conditional block we narrow down the type with *type guards*.

		```typescript
		type Location = Loc2D | Loc3D;
		...
		let loc:Location = ... 
		if (loc instanceof Loc3D) { loc....
		```
		
		
	* **Let, const scoping**: block scope (which avoids redeclarations and writing before declaration) for ```let``` and ```const```: 
	
	
		```typescript
		let currSpeed:number = 15
		const maxSpeed:number = 25
		```
		Note: ```var``` (hoisting and function level) scoping is same as in JavaScript.
	
	* **Async / await for Promises**: ```...```


		```typescript
		const updateGPSinDB = (locData: any) => Promise.resolve(locData); // Fake API call

		const updateBikingRoute = async (metadata: any, callback?: () => void) => {
		  await updateGPSinDB(metadata);
		
		  callback?.();
		};
		```

Note: *Find many more examples at [TypeScript Tutorial](https://www.javatpoint.com/typescript-tutorial).*	

* IDE - Integration
	
Compile — **Transpile** — TS to JS with [VSCode](https://code.visualstudio.com/docs/typescript/typescript-compiling). For some automation, create and  configure ```tsconfig.json``` files in the base directory of your project. 
	
	
```json
{
	"compilerOptions": {
	  "target": "es5",
	  "module": "commonjs",
	  "sourceMap": true
	}
}
```

Optionally, create a ```tasks.json``` file.
		
```json
{
    "tasks": [
        {
            "type": "typescript",
            "tsconfig": "tsconfig.json",
            "problemMatcher": [
                "$tsc"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}
```


## Enhance your toolchain

* Add tools which check your code according given *code metrics*, or trigger automated UI tests.

[Next part (Servers)](../Part-08-MinimalServer/study-material--servers.md)