const fs = require('fs');

const sendResponse = (request, response, statusCode, data) => {
  const { acceptedTypes } = request;

  if (acceptedTypes.includes('text/xml')) {
    response.writeHead(statusCode, { 'Content-Type': 'text/xml' });
    response.write(data.xml);
  } else {
    response.writeHead(statusCode, { 'Content-Type': 'application/json' });
    response.write(data.json);
  }
  response.end();
};

// client.html
const getIndex = (request, response) => {
  const indexHTML = fs.readFileSync(`${__dirname}/../client/client.html`);
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(indexHTML);
  response.end();
};

// style.css file
const getCSS = (request, response) => {
  const css = fs.readFileSync(`${__dirname}/../client/style.css`);
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// ep- success
const getSuccess = (request, response) => {
  const data = {
    json: JSON.stringify({ message: 'This is a successful response' }),
    xml: '<response><message>This is a successful response</message></response>',
  };
  sendResponse(request, response, 200, data);
};

// ep- badRequest
const getBadRequest = (request, response, query) => {
  if (query.valid === 'true') {
    const data = {
      json: JSON.stringify({ message: 'This request has the required parameters' }),
      xml: '<response><message>This request has the required parameters</message></response>',
    };
    sendResponse(request, response, 200, data);
  } else {
    const data = {
      json: JSON.stringify({ message: 'Missing valid query parameter set to true', id: 'badRequest' }),
      xml: '<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>',
    };
    sendResponse(request, response, 400, data);
  }
};

// ep-  /unauthorized
const getUnauthorized = (request, response, query) => {
  if (query.loggedIn === 'yes') {
    const data = {
      json: JSON.stringify({ message: 'You have successfully viewed the content.' }),
      xml: '<response><message>You have successfully viewed the content.</message></response>',
    };
    sendResponse(request, response, 200, data);
  } else {
    const data = {
      json: JSON.stringify({ message: 'Missing loggedIn query parameter set to yes', id: 'unauthorized' }),
      xml: '<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>',
    };
    sendResponse(request, response, 401, data);
  }
};

// ep- forbidden
const getForbidden = (request, response) => {
  const data = {
    json: JSON.stringify({ message: 'You do not have access to this content.', id: 'forbidden' }),
    xml: '<response><message>You do not have access to this content.</message><id>forbidden</id></response>',
  };
  sendResponse(request, response, 403, data);
};

// ep- internal
const getInternal = (request, response) => {
  const data = {
    json: JSON.stringify({ message: 'Internal Server Error. Something went wrong.', id: 'internalError' }),
    xml: '<response><message>Internal Server Error. Something went wrong.</message><id>internalError</id></response>',
  };
  sendResponse(request, response, 500, data);
};

// ep - notImplemented
const getNotImplemented = (request, response) => {
  const data = {
    json: JSON.stringify({ message: 'A get request for this page has not been implemented yet. Check again later for updated content.', id: 'notImplemented' }),
    xml: '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>',
  };
  sendResponse(request, response, 501, data);
};

// ep -  404 Not Found
const getNotFound = (request, response) => {
  const data = {
    json: JSON.stringify({ message: 'The page you are looking for was not found.', id: 'notFound' }),
    xml: '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>',
  };
  sendResponse(request, response, 404, data);
};

module.exports = {
  getIndex,
  getCSS,
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound,
};
