#!/bin/bash

# compare: http://www.linuxjournal.com/content/downloading-entire-web-site-wget
# The options are:
#
# --recursive: download the entire Web site.
#
# --domains website.org: don't follow links outside website.org.
#
# --no-parent: don't follow links outside the directory tutorials/html/.
#
# --page-requisites: get all the elements that compose the page (images, CSS and so on).
#
# --html-extension: save files with the .html extension.
#
# --convert-links: convert links so that they work locally, off-line.
#
# --restrict-file-names=windows: modify filenames so that they will work in Windows as well.
#
# --no-clobber: don't overwrite any existing files (used in case the download is interrupted and
# resumed).

wget \
  --recursive\
  --page-requisites\
  --html-extension\
  --convert-links\
  --restrict-file-names=windows\
  --domains en.wikipedia.org\
  --no-parent\
  https://en.wikipedia.org/wiki/Jimmy_Wales



# If wget might not work as expected, check the robots.txt file on the server
# E.g. at https://en.wikipedia.org/robots.txt you will find:
#  ....
# # Sorry, wget in its recursive mode is a frequent problem.
# # Please read the man page and use it properly; there is a
# # --wait option you can use to set the delay between hits,
# # for instance.
# #
# User-agent: wget
# Disallow: /
#  ....