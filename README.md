DMX
===

Synopsys
--------

This web application checks a Google Drive spreadsheet with a DMX patch for any conflicts


Installation
------------

After cloning the repository, you need to install dependencies:

```
   npm install
   bower install
```

Spreadsheet
-----------

Create a new spreadsheet with the following columns:

- Number
- Description
- Position
- Footprint
- Universe
- Address

Then, fill the spreadsheet with your patch, but don't leave any empty rows inbetween (This is a limitation of Google's API).

Make sure the spreadsheet is published. Otherwise it can't be accessed through the API.

Run
---

You can run a simple webserver using node, and then connecting to http://localhost:3000/


```
   node server.js
```

Todo
----

- Better patch overview (with usage per universe)
