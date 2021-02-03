"use strict";
exports.__esModule = true;
function createResponse(statusCode, body, headers) {
    if (statusCode === void 0) { statusCode = 200; }
    if (body === void 0) { body = {}; }
    if (headers === void 0) { headers = {}; }
    var baseHeader = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    Object.keys(headers).forEach(function (key) {
        baseHeader[key] = headers[key];
    });
    return {
        body: body,
        statusCode: statusCode,
        headers: baseHeader
    };
}
exports["default"] = createResponse;
