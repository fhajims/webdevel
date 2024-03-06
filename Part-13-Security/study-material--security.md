[Home](../README.md)

# Security 

## Threats and Mitigations

### Selected Examples
* SRF/XSRF
	* **Cross-site Request Forgery**	
	* Threat: malicious website sends commands to *trusted* user
	* Mitigation: use same site cookie attribute
* XSS
	* **Cross-site Scripting**	
	* Threat: Inject malicious script(s) in trusted web app
	* Mitigation: input validation (whitelisting, escaping special characters)
	* [Minimal XSS example](./InsecureServers/13-Server-XSS-CrossSideScripting)
* CORS
	* **Cross-origin Resource Sharing**
	* Threat: Allow javascript to fetch data from foreign (cross-origin) server
	* Mitigation: Do not relax Same Origin Policy (SOP)
* Session Hijacking
	* Threat: using exploited (stolen, for example, by packet sniffing, session fixation, cross-site scripting) session keys
	* Mitigation: Validate data, HTTPOnly cookies, set content security policy (client whitelisting) 
* Cookie Poisoning
	* Threat: impersonate a valid client (by modifying session cookies)
	* Mitigation: Use HTTP Strict Transport Security (HSTS)
* URL/FormField Tampering
	* Threat: Modify URL parameters
	* Mitigation: use HTTP POST to transfer data
* SQL Injection
	* Threat: injected commands in SQL queries
	* Mitigation: Use prepared statements
* Code Injection
	* Threat: injected commands in server logic
	* Mitigation: input validation, escape data
	* [Minimal Remote Code Execution example](./InsecureServers/11-Server-RemoteCodeExecution)

* Other minimal examples of [insecure servers and web socket servers](./InsecureServers): [Path Traversal](./InsecureServers/12-Server-PathTraversal)

Find [more insecurity ideas](./study-material--insecurity-ideas.md) to implement, crack, and/or mitigate.


## Web Crypto API

*Check out the prerequisites[^crypto], the know-how on cryptography to be able to understand coroutines properly.*


[^crypto]: **Prerequisites**: Knowledge about cryptographic secure random values, hashing, initialisation vectors, block ciphers, shared secrets, private keys, public keys, symmetric encryption, asymmetric encryption, public key cryptography, digital signatures, and passphrase based symmetric encryption, ... and *Alice*, *Bob*, *Eve*, and *Mallory*. Commonly used abbreviations: AES, CBC, CFB, CMAC, CONCAT, CTR, DH, ECDH, ECDSA, GCM, HKDF, HMAC, KW, OAEP, PBKDF, PKCS, PSS, RSA, RSASSA,  SHA.




* Generate keys (key pairs)
	
	Creating a key to sign and verify a message using *Hash-based Message Authentication Code* (HMAC).
	
	```
	//whether the key is extractable 
	// (i.e. can be used in exportKey)
	const canBeExtracted = false;
	
	window.crypto.subtle.generateKey(
	    {
	        name: "HMAC",
	        hash: {name: "SHA-256"},
	    },
	    canBeExtracted,
	    ["sign", "verify"] 
	)
	.then(function(key){
	    // TODO: store the key
	    console.log(key);
	})
	.catch(function(err){
	    console.error(err);
	});
	```

* Sign and verify data

	Sign using the key from above:
	
	```
	const message = "whatever"
	// ArrayBuffer
	const dataToSign = myFunctionToConvertStringToArrayBuffer(message)
	
	window.crypto.subtle.sign(
	    {
	        name: "HMAC",
	    },
	    key,
	    dataToSign 
	)
	.then(function(signature){
	    // TODO store the signature to be used later
	    // Note: signature is of type "ArrayBuffer"
	    console.log(new Uint8Array(signature));
	})
	.catch(function(err){
	    console.error(err);
	});
	```

	Verify a message using the key and signature from above:



	```
	// ArrayBuffers: signature, data
	window.crypto.subtle.verify(
	    {
	        name: "HMAC",
	    },
	    key,
	    signature,
	    data
	)
	.then(function(signatureIsValid){
	    console.log("Valid: "+signatureIsValid);
	})
	.catch(function(err){
	    console.error(err);
	});
	```

* Encrypt and decrypt data

	Encrypt some data useing the AES algorithm in mode GCM:

	```
	// one-time(!) initialisation vector iv:
	const randIV = window.crypto.getRandomValues(new Uint8Array(12))
	
	// tag length
	const l = 120, // 32, 64, 96, 104, 112, 120 or 128 (default)
	
	// Optional: add-on data
	const optionalAddedDataAsArrayBuffer = 
	
	window.crypto.subtle.encrypt(
    {
        name: "AES-GCM",
        iv: randIV,
        additionalData: optionalAddedDataAsArrayBuffer,
        tagLength: l,
    },
	    key,
	    data // ArrayBuffer
	)
	.then(function(encryptedData){
	    console.log(new Uint8Array(encryptedData));
	})
	.catch(function(err){
	    console.error(err);
	});
	```

	Dencrypt some data useing the AES algorithm in mode GCM:

	```
	window.crypto.subtle.decrypt(
	    {
	        name: "AES-GCM",
	        iv: randIV,
	        additionalData: optionalAddedDataAsArrayBuffer,
	        tagLength: l, 
	    },
	    key,
	    data
	)
	.then(function(decryptedDataAsArrayBuffer){
	    console.log(new Uint8Array(decryptedDataAsArrayBuffer));
	})
	.catch(function(err){
	    console.error(err);
	});
	```



Check out subdirectory [CryptoAPI](./CryptoAPI/) with some simple [Web CrpytoAPI Demos](./CryptoAPI/README.md).

[Next part (Selected Topics / Optimisation)](../Part-14-Optimisation/study-material--optimisation.md)


- - - 

This file can be found at <https://git-iit.fh-joanneum.at/Feine/omd-web-devel/-/tree/master/Part-13-Security/>