const http = require('http');
const url = require('url');

const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// status codes
const urlStruct = {
  '/': responseHandler.getIndex,
  '/success': responseHandler.getSuccess,
  '/badRequest': responseHandler.getBadRequest,
  '/unauthorized': responseHandler.getUnauthorized,
  '/forbidden': responseHandler.getForbidden,
  '/internal': responseHandler.getInternal,
  '/notImplemented': responseHandler.getNotImplemented,
  '/style.css': responseHandler.getCSS,
  default: responseHandler.getNotFound,
};

// HTTP on requests
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url, true);

  // accepted types
  request.acceptedTypes = request.headers.accept.split(',');

  // Route request
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, parsedUrl.query);
  } else {
    urlStruct.default(request, response);
  }
};

// Start the server
http.createServer(onRequest).listen(port, () => {
  console.log(`Server running on 127.0.0.1:${port}`);
});
