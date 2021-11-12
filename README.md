---
title: Import.io endpoint
keywords: 
last_updated: April 12, 2018
tags: []
summary: "Detailed description of the API of the import.io endpoint."
---

## Overview

The import.io endpoint has the following features:
 
- Access to the most comment REST API methods
- Automatic conversion between NDJSON and JSON
- Management of CSV files

Please make sure you take a look at the documentation from import.io as features are based on its API:

- [API Documentation](http://api.docs.import.io/)

## Quick start

Once you configured the endpoint, you can trigger one of the extractors with this call:

```js
var res = app.endpoints.importio.run.extractor.start.post(extractorId);
log('crawlrun id: '+res.crawlRunId);
```

Then you can check the status of the run with this script:

```js
var res = app.endpoints.importio.store.crawlrun.get(crawlRunId);
if (res.state == 'FINISHED') {
    log('crawl run is completed!');
}
```

Then you can download the results in CSV or JSON:

```js
// in JSON
var res = app.endpoints.importio.data.extractor.json.latest.get(extractorId);
log('res: '+JSON.stringify(res));

// in CSV
var file = app.endpoints.importio.data.extractor.csv.latest.get(extractorId);
var record = sys.data.createRecord('results');
record.field('extractor').val(extractorId);
record.field('csv').val({
  id: file.fileId,
  name: file.fileName,
  contentType: file.contentType
});
sys.data.save(record);
```

## Configuration

Before configuring the endpoint you will need to have an account in import.io. 

### API key

This is the API key of the import.io account. You can find it in your account's settings.

## Javascript API

The Javascript API of the endpoint is based on the [REST API of import.io](http://api.docs.import.io/),
so you should see their documentation for details on parameters and data formats. If there are differences
they will be explained here.

### data.import.io

#### Get latest CSV

```js
app.endpoints.importio.data.extractor.csv.latest.get(extractorId);
```

Returns the information of the file that you can use to read it or store it in a file field like this:

```js
var file = app.endpoints.importio.data.extractor.csv.latest.get(extractorId);
var record = sys.data.createRecord('results');
record.field('extractor').val(extractorId);
record.field('csv').val({
  id: file.fileId,
  name: file.fileName,
  contentType: file.contentType
});
sys.data.save(record);
```

Check [REST API of import.io](http://api.docs.import.io/#!/data.import.io/get_extractor_extractorId_csv_latest) for more details about the request and response.

#### Get latest JSON

```js
app.endpoints.importio.data.extractor.json.latest.get(extractorId);
```

Returns a JSON that contains a list of results. Keep in mind that the endpoint converts from NDJSON to JSON:

```js
var res = app.endpoints.importio.data.extractor.json.latest.get(extractorId);
log('res: '+JSON.stringify(res));
```

Check [REST API of import.io](http://api.docs.import.io/#!/data.import.io/get_extractor_extractorId_json_latest) for more details about the request and response.

### run.import.io

#### Run extractor

```js
app.endpoints.importio.run.extractor.start.post(extractorId);
```

Runs a extractor and returns the crawl run ID:

```js
var res = app.endpoints.importio.run.extractor.start.post(extractorId);
log('crawlrun id: '+res.crawlRunId);
```

Check [REST API of import.io](http://api.docs.import.io/#!/run.import.io/post_extractor_extractorId_start) for more details about the request and response.

#### Cancel extractor

```js
app.endpoints.importio.run.extractor.cancel.post(extractorId);
```

Cancels the current execution of the extractor. 

Check [REST API of import.io](http://api.docs.import.io/#!/run.import.io/post_extractor_extractorId_cancel) for more details about the request and response.

### store.import.io

#### Get crawl run information

```js
app.endpoints.importio.store.crawlrun.get(crawlRunId);
```

Returns information about the crawl run. You can check the state for example:

```js
var res = app.endpoints.importio.store.crawlrun.get(crawlRunId);
if (res.state == 'FINISHED') {
    log('crawl run is completed!');
}
```

Check [REST API of import.io](http://api.docs.import.io/#!/store.import.io/get_crawlrun_crawlRunId) for more details about the request and response.

#### Get CSV attachment of crawl run

```js
app.endpoints.importio.store.crawlrun.attachment.csv.get(crawlRunId, attachmentId);
```

Returns the file information of the results of the crawl run.

Check [REST API of import.io](http://api.docs.import.io/#!/store.import.io/get_crawlRun_crawlRunId_attachment_csv_attachmentId) for more details about the request and response.

#### Get JSON attachment of crawl run

```js
app.endpoints.importio.store.crawlrun.attachment.csv.get(crawlRunId, attachmentId);
```

Returns the JSON results of the crawl run. Keep in mind that the endpoint converts the results from NDJSON to JSON.

Check [REST API of import.io](http://api.docs.import.io/#!/store.import.io/get_crawlRun_crawlRunId_attachment_json_attachmentId) for more details about the request and response.

#### Set inputs for extractor

```js
app.endpoints.importio.store.extractor.attachment.inputs.put(extractorId, inputs);
```

Sets the inputs for an extractor. The API accepts the inputs in NDJSON, but the endpoint takes care of the conversion
from JSON to NDJSON, so you just need to send regular JSON:

```js
var inputs = [
  {
    _url: 'https://peoplecheck.com/search',
    'First Name': 'John',
    'Last Name': 'Doe'
  },
  {
    _url: 'https://peoplecheck.com/search',
    'First Name': 'Alan',
    'Last Name': 'Smith'
  },
  {
    _url: 'https://peoplecheck.com/search',
    'First Name': 'Michael',
    'Last Name': 'Miller'
  }
];
var res = importio.store.extractor.attachment.inputs.put(extractorId, inputs);
log('res: '+JSON.stringify(res));
```

Check [REST API of import.io](http://api.docs.import.io/#!/store.import.io/put_extractor_extractorId_attachment_inputs) for more details about the request and response.

## Events

This endpoint does not provide any event.

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This endpoint is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
