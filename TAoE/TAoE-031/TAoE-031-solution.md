---
#### [Overview](../TAoE--TheArtofError.md) 
---


## TAoE-031 Solution

The Art of Error (TAoE)

### The solution for [TAoE-031](./TAoE-031.md).

#### Main Problem

* The script is executing too early.
	* I.e. the script does not delay execution and will not wait for the DOM tree to be loaded into memory.
  

#### Main Solution

* Defer the script to be executed when the DOM is ready.


- - -

## Some more troubles:

* Tag for document type is missing.
* The HTML structure is not correct, e.g. the `head` tag is missing.
* If this code snippet is used on many pages:
	* The same JavaScript code is loaded again and again (for every page).

	

---
#### [Back to the overview](../TAoE--TheArtofError.md) 
---

