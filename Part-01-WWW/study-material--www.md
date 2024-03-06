[Home](../README.md)

# The World Wide Web (WWW)

Following terms must be understood to communicate with web programmers.

## The web needs the Internet

Terminology expected to be known: 

* Infrastructure: Server, Clients, Router, Switches, Firewall, Proxies
* Domain Name Service: DNS
* Internet Protocol (IP): IPv4 vs. IPv6
* Protocols: HTTP vs. HTTPs
	* Protect data on transit! Prefer secure connections. Use the secure version of HTTP named HTTPs! It uses Transport Layer Security (TLS) (successor of Secure Socket Layer, SSL). 
	* Remember: HTTP stands for stateless client to server connection. It is **NOT** *peer to peer*, it is **NOT** a persistent *socket connection*!! 
	* Note: **HTTP/2** is really different. For performance reasons! Outlook: **HTTP/3** will be even faster.
* The Internet Engineering Task Force (IETF) develops standards for the Internet via Requests for Comments (RFC).

*Compare lecture(s) about networking.*

## The Web

### Organisation

* W3C — The World Wide Web Consortium (founded by Tim Berners-Lee) develops and publishes **specifications** for the Web using a standardisation process from *Drafts* to *Recommendations*.

* Selected, very important standards (**W3C Specs**): 
	* HTML5 (= HTML Living Standard)
	* CSS3 (= short for CSS Level 3)


### Loading a web page

* Enter an **URL**[^url] in the address bar of a *browser*
* Perform DNS[^dns] resolution
* Send **Request** to server
* Accept **Response** (includes the HTML as text) from server
* The browsers is **parsing** the HTML (text string)
* and creates and internal representation in memory, called **DOM**[^dom] 
* **Render** the DOM tree (draw images, texts on screen)
* Until all resources loaded (some in parallel):
	* Load more resources (css, js), parse, execute them
	* (Modify DOM)
	* Re-render HTML (if necessary)

[^url]: URL: Uniform Resource Locator
[^dns]: DNS: Domain Name Service
[^dom]: DOM: Document Object Model

### The HyperText Transfer Protocol (HTTP)

* HTTP protocol: is **stateless**, i.e. One request is independant of (unrelated to) another. Note: That is why you need other mechanism to create a **session**.
	* Learn by heart (you will need it anyway):
		* The default http port number is: **80**
		* The default https port number is: **443**


* HTTP methods (verbs): **GET**, **POST**, PUT, DELETE, and HEAD, TRACE, and OPTIONS are the most relevant ones.


* Example call (here on command line with ```curl``` :

 
	```
	curl -vvv https://docs.python.org/
	```

	*Note:* ```-v``` to get verbose output.

* Clients sends **Request** (header, body/payload): URL, ...

	```
	...
	> GET / HTTP/2
	> Host: docs.python.org
	> User-Agent: curl/7.64.1
	> Accept: */*
	...
	``` 

* Server answers with **Response** (header, body/payload): Status Codes, Cookies, ...

	```
	...
	< HTTP/2 302 
	< server: nginx
	< content-type: text/html
	< location: https://docs.python.org/3/
	...
	<html>
	<head><title>302 Found</title></head>
	<body>
	<center><h1>302 Found</h1></center>
	<hr><center>nginx</center>
	</body>
	</html>
	``` 

	* Learn by heart (you will need it anyway)
		* **Status Codes** 1xx info, 2xx success, 3xx redirect, 4xx client errors, 5xx server errors
		* HTTP status codes for "OK" are **200** - 299
		* Other often seen **Status Codes**, e.g.: 
			* 101 switching protocol to web socket
			* 302 redirection to another URL
			* **404** resource not found on server


### Cookies

Cookies (small chunk of information created by the server and send to the client. The browser stores the cookies in an internal database. On further requests to the same server the browser automatically adds the coookie information. The server can use this to create sessions to know a request is *related to* a previous request, i.e. the request is from the same user/browser.)
		
* Example
	
	```
	curl -vvv https://www.fh-joanneum.at/ | more
	```
	
	will output 
	
	```
	...
	Set-Cookie: PHPSESSID=uu0sboaqork...mthes5; expires=Wed, 13-Oct-2021 14:50:18 GMT; Max-Age=31536000
	...
	```

* Content of a cookie:
	* **Name=Value** information in form of a key=value pair
	* **Domain=** will be sent back to following domain (server)
	* **Path=** will be sent back if URL contains this path
	* **Expires=** valid until date (or valid for **Max-Age=** seconds)
	* **HttpOnly** flag, i.e. the cookie can not be read by JavaScript
	* **Secure** flag to transmitted a cookie only via a secure connection, i.e. https (never with http).
	* SameSite=, i.e. with *strict* must not be attached to *cross-site* requests

A cookie is just a string ```Set-Cookie: ...``` with parts (see above) seperated by ```;```. A cookie is deleted by the browser if it has expired.

### Universal Resource Locator (URL)

* URI[^uri] vs. URL
	* Parts of the URL: **protocol**, **port**, **path**, **query string**, **fragment**
	* For example ```https://www.fh-joanneum.at:8080/itm/index.html?lang=en&sessionid=acb76bd43a#about```

* download text and binary data
	* Browser detects type of data by its **content type** (or mime[^mime] type)   
	* Example for **MimeType**s: ```text/html```, ```text/css```
	* For example the server sends response:

		```
		...
		Content-Type: text/html; charset=UTF-8
		...
		<!DOCTYPE html>
		<html lang="de-DE">
		 <head>
			...
		 </head>
		 <body>
			...
		 </body>
		</html>
		``` 

[^uri]: URI: Uniform Resorce Identifier
[^mime]: MIME: Multipurpose Internet Mail Extensions



### Encoding of data


Textual formats (plain text, html, css, json, xml) are human readable, but binary data (jpg, zip, pdf) is far more efficient!

To specify in which format data is encoded, information about the **content type** is sent along in the response. Typical internet media types (MIME for Multipurpose Internet Mail Extensions) **MimeTypes**[[1]] are:

* application/json
* application/pdf
* application/zip
* image/jpeg
* **image/png**
* multipart/form-data
* **text/html**
* text/plain
* text/xml

A special encoding is **base64**, where arbitrary binary data (e.g. an image) is encoded in 64 characters. The characters are ```ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/``` (and ```=``` for final padding to 4 Bytes, if necessary). Each of those characters is included in any 7 bit (or more) character set (e.g. ASCII).

* Advantage: can be transmitted like normal text, there are no *problematic* bytes with special meaning (such as end-of-file).
* Disadvantage: about 33% more data has to be transmitted.

Sometimes one might find base64 encoded images direct embedded into HTML (text) files ```<img  src="data:image/gif;base64,R0lGODdhEAAQA....4QAIQA7">```, for the html including the image(s) are all in **ONE** single file.

### Data and Information

* Data vs. Metadata vs. Layout
	* HTML must hold the **data** 
		* The raw data, the real information.
		* Independent of (the print/screen) layout. Possibly, raw data looks awful.
	* HTML should hold some **metadata**
		* *About* the content, about the raw data.
		* E.g. Author, keywords.
	* HTML should specify meaning, the **semantic** information.
		* Structure: heading, navigation, section/article content.
		* Meaning of single text or fields. E.g. this is a password input field of a form.
	* HTML should NOT contain **layout** information
		* Use external Cascading Style Sheet (CSS) file(s).
		* CSS specifies position, color, font sizes etc.
		* Browser render the *raw data* as defined by styles.
	
	
### Optimisation

* Faster page loading
	* 	Minimise number of HTTP requests (use fewer CSS[^css]/JS[^js] files for your webpage)
	* Compress/minify documents to make them smaller.
	* Use **Content Delivery Network** (CDN) 
	* Reduce DNS Lookups
	* Make (image, favicon, JS, JSON[^json], CSS) documents cachable
	* Avoid Redirects
	* Reduce Cookie Size
	* Do not scale images (provide small images)

* Use **HTTP/2** (much better than HTTP 1.1) to get increased performance and reduced latency, because HTTP/2 supports:
	* multiplexing connections (reuse a connection and send multiple documents using just this single connection)
	* header compression
	* server push
	
[^css]:  CSS:  Cascading Style Sheet
[^js]:   JS:   JavaScript
[^json]: JSON: JavaScript Object Notation
	
## Web Terminology

* Website vs. Webpage
	* Webpage: A single HTML document.
	* Website: A homepage.
	
* CMS vs. Web Service
	* CMS: a *Content Management System* is a system which allows interactive adding and modification (editing) of content. 
	* Web service: a server (software application) providing data (e.g. weather data) in machine readable formats (e.g. JSON). This data is used by other servers, by mobile applications, or by rich internet applications (JavaScript enhanced, interactive, dynamic web pages). 

* Web 2.0 vs. Web 3.0
	* Web 1.0: static web pages. 
	* Web 2.0: websites are participative. Web pages provide user-generated content. Includes the **social web**.
	* Web 3.0: The **semantic web**. Data is augmented with (machine readable) *metadata*. It allows machine to machine communication.

	
* Hypertext Systems
	* Web (HTML documents) with **unidirectional** links. Using a browser, the embedded links allow navigation from one HTML document to an other HTML document (by clicking a link).
	
* **Progressive Enhancement**
	* Key functionality is garanteed.
	* **Feature detection** is used to find out if the browser supports a feature needed.
	* Optional features only if browser support given and/or bandwidth high enough
	* This way, modern browsers will deliver *better* user experience (UX)

* **Graceful Degradation**
	* Web page developer provide code to make sure missing browser support (feature not available) will NOT result in errors. 
	
* **Polyfill**
	* Some JavaScript code web developers add to a page. The code implements/simulates modern features on old browsers.	
	
[1]: https://www.iana.org/assignments/media-types/media-types.xhtml


[Next part (Debugging)](../Part-02-Debugging/study-material--debugging.md)