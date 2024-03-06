[Home](../README.md)

# HTML5 #

## Rendering 

A browser loads the HTML and parses the content into an internal format (DOM) to render it on screen. Multiple additional resources are loaded (stylesheets) which might cause the browser to render the content again, but now in a more beautiful way. Finally, JavaScript files might be loaded to add functionality such as visual effects (slideshow) or background communication to a server (fetch a new image on user's swipe gesture).

## DOM 

Internal representation of the page. Hierarchical representation (tree) of nodes in memory: **DOM tree**. Using JavaScript this tree of nodes might be changed arbitrarily. Such a node might be a password field with attributes (such as the width), but also the visual appearance (such as the background color).

* Terms: DOM, TAGs, Elements, Attributes, Nesting

## Building Blocks

### Tags (should be closed)
* E.g. ```<a >...</a>```

* Learn by heart (you will need it anyway)
	* `html`, `head`, `body`,
	* `title`
	* `h1`, `h2`
	* `p`, `div`, `span`
	* `a`
	* `li`, `ol`, `br`
	* ```<!-- comment -->```
	* `img`, `link`
	* `meta`
	* `table`, `th`, `tr`, `td`
	* `form`, `input`


* *Hint: avoid styling with HTML tags such as `em`, `b`, `i`, `small`, `center`.*
* *Hint: use `span` to style parts of a text, use `div` for CSS layouts*

Find all details in the [Official HTML5 Standard](https://html.spec.whatwg.org/#semantics).

### Attributes (very often key="value")

* Learn by heart (you will need it anyway)
	* **href** for link destinations, e.g.: ```<a href="/help.html">Help</a>```

	* **target** for opening in another browser windows, e.g.: ```<a target="_blank" class="extLink" href="https://docs.wehelp.com/help.html">Help</a>```
	
	* **method**, **action** for forms to define how (in which format) form data will be sent and to which service the data will be send on submit-button click, e.g.: ```<form method="post" action="/cgibin/registerandsendamail.pl">...</form>```
	
	* **type**, **name** for text/date/number - input fields in forms, e.g.: ```<input type="radio" name="blue">Blue Color</input>```
	* **type="submit"** for sending (submitting) a form by pressing the submit button, e.g.: ```<button type="submit" value="login">Login Now</button>```

## Basic Structure

* First line specifies that the data format is HTML5 ```<!DOCTYPE html>```.

* `html`, `head`, `title`, `body`, `h1`, ... 

Minimal HTML5 example:

```html
<!DOCTYPE html>
<html lang="en">
  <head><title>Minimal HTML5</title></head>
  <body>
    Minimal HMTL.
  </body>
</html>
```

Please, always check the structure. For example use a [HTML5 validation](https://validator.w3.org) service. If the syntax and the nesting is ok, the HTML-document is called *well-formed*.



### Hyperlinks

* relative, e.g.: 

	```<a href="/getting-help/">Support</a>``` 

* absolut, e.g. 
	```<a href="https://about.gitlab.com/getting-help/">Support</a>```


### Tables

Use tables for tabular data, NOT for layouting the page.

Minimal HTML Table example:

```html
...
<table class="holidayTripTable">
      <thead>
        <tr>
          <th>Day</th>
          <th>City</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Monday</td>
          <td>Rome</td>
          <td>Segway trip in the city centre.</td>
        </tr>
      </tbody>
    </table>
...
```



### Semantics for the Page Layout

Semantic tags are used for structuring a page. Typically, ```header``` and ```footer```, the ```main``` area and a ```nav``` (navigation) area are provided.


```html
...
<body>
		<header>...</header>
		<nav>...</nav>
		<main>
		  <section>
		    <article>...</article>
		    <article>...</article>
		  </section>
		</main>
		<footer>...</footer>
</body>
...
```

### Semantic Tags

* Note: both, the ```article``` or the ```section``` tag might contain the content. 

### External Stylesheets

* Create a new file. E.g. named ```fhj_main.css```. This one  sets the style for the tag (DOM element) named ```body```.

```css
body {
  background-color: rgba(128, 128, 128, 0.15);
}
```

* E.g. ```<link rel='stylesheet' id='fh-main-css'  href='fhj_main.css' type='text/css' media='all' />```

Hint: *Open your browser and change the color
     using the web inspector. It's live!*


Always check the format of the stylesheet. E.g. using the [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/#validate_by_input).

Find more on style sheets in [Part 5, the Section on CSS](../Part-5-CSS/study-material--css.md)).


### External JavaScript
* E.g. 

	```html
	<script type='text/javascript' 
			src='https://www.fh-joanneum.at/content/themes/fhjoanneum/static/jquery/jquery.3.2.1.js?ver=3.2.1'></script>
	```

## Metadata
* E.g. 

	```html
	<meta name="robots" content="index, follow">
	```
* E.g. 

	```html
	<meta charset="UTF-8">
	```


## Usability (UX)
* For example, the attribute ```placeholder``` for a tag (such as an input field), holds temporary text which gives explains what to enter in the input field, or gives an example.
 
```html
...
<input name="username" 
       type="email"
       placeholder="enter username as email" />
...
```


## Accessibility (A11y)

Help **visually impaired** (even blind) people! Help people with **motor disabilities**, with **cognitive restrictions**! Add support for **deaf** people!

* Provide enough **contrast** to make text better readable. 

* Provide **semantic tags**. They can be interpreted by **screenreaders**. 

* Add descriptive information for images. Use the **alt** tag to explain what is visible on an image.

* Example: Alternative text (```alt``` tag) for images: 

	```html
	<img src="sunset.png" 
		 alt="The colorful sunset on the beautiful beach of the mediterranean islands.">
	```
* Web Accessibility Guidelines (WCAG)[[1]]
	* Guidelines specify how to improve the page for people with disabilities.



### Forms

Forms allow user input, which is sent to a server and processon on the server. When the user clicks on a submit button, the data is send with a HTTP (POST) request containing the **form data** as key / value in the request body.

Minimal HTML5 Form example:

```html
...
Login form which collects some personal data

<form action="./processLoginOnServer.php"
      method="POST">
      
  <label for="theUserNameField">Username</label>
  <input name="username" 
         type="email"
         id="theUserNameField"
         placeholder="enter username as email" />
  
  
  <label for="thePasswordField">Username</label>
  <input name="password" 
         type="password"
         id="thePasswordField"
         placeholder="enter password" /> <br />
         
  Profile: <br />

  <label for="theAgeField">Your age=</label>
  <input id="theAgeField" name="age"
                  type="number"
                  min="17"
                  max="110"
                  value="21" />
  <button type="submit" value="Login">Login Now</button>

</form>
...
```

Note: add labels for the fields by field id. This allows screen readers to read the label when a user is focused on the element.


### Form data explained

As stated above, with **forms** users can enter information in the web page and on submit (button click) the data is sent to a server. The format is specified with the **enctype** attribute.

* "application/x-www-form-urlencoded" (default)
* "multipart/form-data" 
* "text/plain"

So what is urlencoded? A way to modify a string to be a valid URL. Not all chars are allowed in an URL, special chars must be replaced by a different representation, their *internal number* (hexadecimal ascii). This is done by, for example, replacing a space (ascii character with decimal number 32, which is 20 in hex) with %20.

* **urlencode** string *"admin"* for field username and string *"Pa$$w0rd !"* for field password: 


	```
	username=admin&password=Pa%24%24w0rd%20%21
	```

## Performance 

* Important Note: Use `async` (asynchronous, concurrent) and `defer` **deferred loading** for resouces (such as JavaScript, CSS, or images). Especially, JavaScript should be loaded with `defer` set, to be executed only after the full html data is loaded and parsed into the DOM. Only, if the DOM is available in the main memory, it should be manipulated by JavaScript. Otherwise, simple calls, such as `getElementById` might fail for not finding the element in an incomplete (not fully loaded) DOM tree. 

* E.g. ```<link .... defer>```

Suggested HTML5 example:

```html
<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<title>Suggested HTML5 web page</title>
		<link rel="stylesheet" href="joanneum.css">
		<script src="joanneum.js" defer></script>
	</head>

	<body>
			<header>
  				<h1>Background Information</h1>
  			</header>
  			<nav><a href="#home">HOME</a></nav>
			<main>
			  <section>
			    <p>Style Sheets</p>
			    <article>CSS</article>
			    <article>CSS3</article>
			    <article>CSS Animation</article>
			  </section>
			  <section>
			    <p>JavaScript</p>
			    <article>Basics</article>
			    <article>Advanced</article>
			    <article>TypeScript</article>
			  </section>
			</main>
			<footer>
				2075 © FHJ
			</footer>
	</body>

</html>
```



## History

* Previous Version of HTML was xHTML, a flavour of (the very strict format) XML. Older versions got version numbers  (HTML1, HTML4), but HTML is considered to be changed over time, it is called a **living standard**.
	* HTM5 advantages: new semantic tags for structuring a page, such as  **section**, **nav**, **article**, **aside**, **header**, **footer**, **main**
	* HTML5 advantages: new tags for **figure** (including **figcaption**), **math**ematical expressions, vector graphics in **svg** and multimedia: **video**, **audio** (including alternative **source**s and more **track**s).
	* HTML5 advantages: **canvas** tag to *draw anything* (arbitrary pixel, e.g. used for games).
	* HTML5 advantages: new semantic tags for **data**,  **time**, **mark** (highlighed), **ruby** - annotations to explain a term (E.g. *world wide web consortium* for *w3c)*  
	* HTML5 advantages: more form elements, such as **meter**, **output**, **progress**.
	* HTML5 disadvantage: not that strict. E.g. attributes such as *defer* are not in form *key="value"*.


[1]: https://www.w3.org/WAI/standards-guidelines/wcag/


[Next part (Multimedia)](../Part-04-Multimedia/study-material--multimedia.md)