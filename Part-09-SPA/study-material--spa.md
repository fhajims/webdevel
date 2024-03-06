[Home](../README.md)

# Single Page Applications (SPAs) 

Instead of full reloading a web page (by "moving" to another web page), **parts of the current page are replaced with updated content**. When content changes or the user navigates to other parts of an app, the JavaScript engine of the browser (might load new data in the background via **AJAX** and) performs **DOM updates** to render and present modified pages. 

## Client Logic Overview

The logic for navigation and the update with new data (for changing the presented page) all happens on the client and not on the server. Possibly, the client fetches from the server new data in the background. 

## HTML5 and CSS

### Use of HTML5 (semantic) tags

As much context and meta-information is added to the content displayed onscreen.

### RWD Responsive Web Design with Media Queries

The amount (of text) and quality (of images/videos) of the content is **adjusted** to the device and its physical **screen (size)**. The layout (e.g. number of columns, size and location of menu bar, visibility of selected content) changes to present the content for optimised navigation and viewing experience.

Find **media queries** for RWD in [Part 5 Stylesheets](../Part-05-CSS/study-material--css.md).


## JS (JavaScript)

Modern Browser engines can only execute JavaScript code (and web assembly, wasm, see [Part 12](./Part-12-WebAssembly/study-material--wasm.md)). Logic written in other programm languages must be converted to JavaScript (or wasm) before execution.

### Unobtrusive JavaScript

An approach to keep the HTML clean, i.e. keep **HTML free of any JavaScript** code.

## Selected APIs

### History API

Update the URL to reflect **user navigation**, e.g. change the fragment in the URL to indicate that another page of an book is shown.  

```javascript
window.history.back()
```


[Next part (Progressive Web Apps)](../Part-10-PWA/study-material--pwa.md)