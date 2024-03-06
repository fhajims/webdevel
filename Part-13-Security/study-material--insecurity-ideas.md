[Home](../README.md) | [Back](./study-material--security.md)

Get inspired (to implement insecurities for your battle)

An even longer list of 

# InSecurities on Client and Server

Threats and Mitigations


* XSRF/XSRF
	* **Cross-site Request Forgery**	* Threat: malicious website sends commands to *trusted* user
	* Mitigation: use same site cookie attribute

* Remote Code Execution
	* e.g. XSS **Cross-site Scripting** 
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

* Path Traversal

* BrokenAccessControl

* BrokenAuthentication

* URLTampering


### Dark Patterns are also threats (to privacy)

* Dark Patterns, trick the user
	* to accept cookies / terms & conditions
	* to allow reading (gps) location  
	* to click unwanted buttons/links
	* to input (sensitive) data

	* e.g. cookie banners


### How to prevent / mitigate leaks

What is (NOT) suggested to improve Privacy and Security?

* Rate technology and techniques you use (from `---` very insecure ... `+++` very secure)

| ---                | --                   | -           | +                    | ++              | +++                        |
|-------------       |------------          |-------------|-----------           |----------       |-----------                 |
| http://, ws://     |                      |             | https://, wss://     |                 |                            |
| plaintext          | data obfuscation     |             |                      |                 |                            |
|                    | data pseudomisation  |             |                      |  HE             |                            |
|                    | data pseudomisation  |             |                      |  secure storage | do not collect data at all |




- - - 

This file can be found at <https://git-iit.fh-joanneum.at/Feine/omd-web-devel/-/tree/master/Part-13-Security/>