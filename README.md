# WireMock REST Client

## Description
WireMock REST client is a lightweight client to interact with a running [WireMock](http://wiremock.org) server based on the [OpenAPI 3.0 spec](http://wiremock.org/docs/api/).

## Installation

Install this module by running:
```
npm install wiremock-rest-client
```

## Usage
The `WireMockRestClient` has 5 services which correspond with request paths as specified in the OpenAPI spec.
- `global`
- `mappings`
- `recordings`
- `requests`
- `scenarios`

Example:
```javascript
import { WireMockRestClient } from 'wiremock-rest-client';

const wireMock = new WireMockRestClient('http://localhost:8080');

const stubMappings = await wireMock.mappings.getAllMappings();

console.log(stubMappings);

const stubMapping = {
    "request": {
        "method": "GET",
        "urlPathPattern": "/api/helloworld"
    },
    "response": {
        "status": 200,
        "jsonBody": {"hello": "world"},
        "headers": {
            "Content-Type": "application/json"
        }
    }
};

const response = await wireMock.mappings.createMapping(stubMapping);

console.log(response);

// Create mapping from current working directory
await wireMock.mappings.createMappingFromFile('stubs/hello-world.json');

// Create mappings from a directory recursively (based on current working directory)
await wireMock.mappings.createMappingsFromDir('stubs');

await wireMock.mappings.resetAllMappings();

await wireMock.global.shutdown();
// ...
```

## Logging
- Logging is based on [log4js](https://www.npmjs.com/package/log4js)
- Default log level is `info`
- Each log line contains a unique id to trace logs for a single request

To configure a different log level:

```javascript
import log4js from 'log4js';
const logger log4js.getLogger('wiremock-rest-client');

logger.level = 'debug';
```

Debug level will log the request body for each request.

Example:
```shell
2019-11-01T15:57:11.285] [INFO] wiremock-rest-client - [c47e4ee8-6e24-43a8-8fe0-bb0c60c847b7] Request: [POST] http://localhost:8080/__admin/mappings
[2019-11-01T15:57:11.285] [DEBUG] wiremock-rest-client - [c47e4ee8-6e24-43a8-8fe0-bb0c60c847b7] Request body: {"request":{"method":"GET","urlPathPattern":"/api/helloworld"},"response":{"status":200,"jsonBody":{"hello":"world"},"headers":{"Content-Type":"application/json"}}}
[0-0] [2019-11-01T15:57:11.301] [INFO] wiremock-rest-client - [c47e4ee8-6e24-43a8-8fe0-bb0c60c847b7] Response: [201] Created
[2019-11-01T15:57:11.292] [INFO] wiremock-rest-client - [c3690603-c055-4412-a5b0-497704c09dd0] Request: [POST] http://localhost:8080/__admin/shutdown
[0-0] [2019-11-01T15:57:11.299] [INFO] wiremock-rest-client - [c3690603-c055-4412-a5b0-497704c09dd0] Response: [200] OK
```