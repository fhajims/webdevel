[Home](../README.md)

# SEO — Search Engine Optimisation#

People do seldom enter URLs, they use **search engines** to find web pages.

## WHY? 

For your web pages being found (on top of) the search engine's result pages.

* Page ranking

* Google Page Rank

* Conversion rate

* Search vs. Semantic Search

## Implementation

Information for Crawlers. Add information which can be auto-processed by machines. SEO is all about programming for machines, not for humans, but humans profit from the results (E.g. Bing/Google Search Results).

### A *robots* file.

Crawlers (robots) visit web sites to index all the pages they can find. One can provide a simple text file on the server named ```robots.txt``` to give hints to the robots, which files and directories should be indexed (```Allow```) and which not (```Disallow```). Like browsers (Firefox, Chrome,...), robots can be distinquished by a *name*, the ```User-agent``` string. Use the start (```*```) for all robots.

```
User-agent: *
Disallow: /admin/
Allow: /api/rest_v1/?doc
Disallow: /api
```

### Sitemaps

To further ensure, that a robot can find every relevant file within your site, provide a single page with links to all (sub-)pages of interest. Such a page is called a **sitemap**.

### Meta Data 

* Add **keywords**.
* Specify **Canonical URL**


### Avoid Duplicate Content

Duplicate content might decrease the ranking of a page. If the same content is available on multiple pages, the main source (some times called *source of truth*) should be referenced by duplicates (copied pages). Therefore, one has to specify the **canonical URL** in each of the pages.

* Canonical URL

	
	```html
	<link rel="canonical" href="https://myserver.com/" />
	```

### Backlinks improve search ranking

Incoming links from other pages. Third party sources pointing to the web page.


[Next part (TypeScript)](../Part-07-TS/study-material--ts.md)
