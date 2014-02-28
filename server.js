'use strict';

var express = require('express'),
    app = express(),
    server = require('http').createServer(app)
    ;

app.use(express.static('public'));

server.listen(3000);