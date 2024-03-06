---
#### [Overview](../TAoE--TheArtofError.md) 
---


## TAoE-031 Hint II

The Art of Error (TAoE)

#### More hints for [TAoE-031](./TAoE-031.md).


* Which type of document is this? 

* Are any must-have HTML tags missing?

* When is the given JS code executed?

* Could this produce different results, even errors?

* Try to run 300 requests (concurrent with tool *ab*)
	* run (one-liner) server, e.g. `python3 -m http.server 8000`
	* test a single request, e.g. `curl localhost:8000/TAoE-031.html`
	* measure time for 30 concurrent requests ` ab -n 300 -c 30 localhost:8000/TAoE-031.html `


  

Only, after refining your answer again, check out the [Solution](./TAoE-031-solution.md).