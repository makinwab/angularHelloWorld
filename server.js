/* require http module */
var http = require("http");

/* require filesystem module */
var fs = require("fs");

/* require path module */
var path = require("path");

/* require mime module */
var mime = require("mime");

/* create cache */
var cache = {};

// function to handle 404 errors
function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write("Error 404: Resource not found");
    response.end();
}

// function for serving file data
function sendFile(response, filepath, filecontents) {
    response.writeHead(200, {"Content-Type": mime.lookup(path.basename(filepath))});
    response.end(filecontents);
}

// helper function to serve static filesystem
function serveStatic(response, cache, abspath) {
    // if file exists in the cache...
    if (cache[abspath]) {
        // retrieve the file and serve it
        sendFile(response, abspath, cache[abspath]);
    } else {
        fs.exists(abspath, function (exists) {
            // does the file exist?
            if (exists) {
                // read it...
                fs.readFile(abspath, function (err, data) {
                    if (err) {
                        send404(response);
                    } else {
                        // cache the file
                        cache[abspath] = data;

                        // send
                        sendFile(response, abspath, data);
                    }
                });
            } else {
                // send error
                send404(response);
            }
        });
    }
}

// create the http server
var server = http.createServer(function (request, response) {
    // we'll assume no file has been requested
    var filePath = false;

    if (request.url === '/') {
        filePath = 'builds/development/index.html';
    } else {
        // build file path
        filePath = 'builds/development/' + request.url;
    }

    var abspath = './' + filePath;

    // serve file
    serveStatic(response, cache, abspath);
});

// listen for requests
server.listen(3000, function () {
    console.log("Server listening at port 3000");
});



