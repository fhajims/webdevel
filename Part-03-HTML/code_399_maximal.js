

// we use something "magic" called IIFE (Immediately Invoked Function Expression) to wrap out code
//
// ... A lot of the time, the function scope of an IIFE is used to prevent leaking local variables to the global scope.
//
// see https://mariusschulz.com/blog/disassembling-javascripts-iife-syntax 
(function() {
// start of code block wrapped in IIFE
// ...
  
  "use strict";  
  // THis JavaScript is loaded deferred (see attribute 'defer' in HTML), 
  // so HTML has beed loaded completely and all DOM nodes are available.


  // (1) access DOM nodes 
  var footerDOMelement = document.getElementById('footerID');


  // (2) prepare some functionality:
  function setHighlightedFooter() {
       // (6) when user moves the mouse inside the footer DOM element
      footerDOMelement.style.backgroundColor = "red";
  }
  function setNormalFooter() {
      // (7) when mouse moves out
      footerDOMelement.style.backgroundColor = "grey";
  }



  // (3) if DOM element found (var footerDOMelement is not null), we can use it
  if (footerDOMelement) {

      // (4) ... connect functionality with user events
      footerDOMelement.onmouseover = setHighlightedFooter;
      footerDOMelement.onmouseout = setNormalFooter;

      // (5) ....or to modify DOM when this JavaScript starts up (i.e. after loading JS).
      footerDOMelement.innerHTML += " loaded at " + (new Date()).toTimeString();
  }

  /* Note: if you get an error for footerDOMelement is null, you might have forgotten to call javascript with attribute 'defer' */

// ...
// end of code block wrapped in IIFE
})();
