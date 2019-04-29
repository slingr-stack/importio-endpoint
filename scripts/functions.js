//////////////////////////////////////////
// Public API - Generic Functions
//////////////////////////////////////////

endpoint.get = function (url, options) {
    var options = checkHttpOptions(url, {params: options});
    return endpoint._get(options);
};

endpoint.post = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._post(options);
};

endpoint.put = function (url, options) {
    options = checkHttpOptions(url, options);
    return endpoint._put(options);
};

endpoint.delete = function (url) {
    var options = checkHttpOptions(url, {});
    return endpoint._delete(options);
};

//////////////////////////////////////////
// Helpers
//////////////////////////////////////////

endpoint.data = {};
endpoint.data.extractor = {};

// data.import.io/extractor/{extractorId}/csv/latest
endpoint.data.extractor.csv = {};
endpoint.data.extractor.csv.latest = {};
endpoint.data.extractor.csv.latest.get = function(extractorId) {
    var request = {
        path: 'https://data.import.io/extractor/'+extractorId+'/csv/latest',
        forceDownload: true,
        downloadSync: true,
        fileName: 'results.csv'
    };
    return endpoint.get(request);
};

// data.import.io/extractor/{extractorId}/json/latest
endpoint.data.extractor.json= {};
endpoint.data.extractor.json.latest = {};
endpoint.data.extractor.json.latest.get = function(extractorId, callback) {
    var request = {
        path: 'https://data.import.io/extractor/'+extractorId+'/json/latest',
        forceDownload: true,
        downloadSync: true,
        fileName: 'results.ndjson'
    };
    var file = endpoint.get(request);
    return convertNdjsonFileToJson(file.fileId);
};

endpoint.run = {};
endpoint.run.extractor = {};

// run.import.io/extractor/{extractorId}/start
endpoint.run.extractor.start = {};
endpoint.run.extractor.start.post = function(extractorId) {
    return endpoint.post('https://run.import.io/extractor/'+extractorId+'/start');
};

// run.import.io/extractor/{extractorId}/cancel
endpoint.run.extractor.cancel = {};
endpoint.run.extractor.cancel.post = function(extractorId) {
    return endpoint.post('https://run.import.io/extractor/'+extractorId+'/cancel');
};

endpoint.store = {};
endpoint.store.crawlrun = {};

// store.import.io/crawlrun/{crawlRunId}
endpoint.store.crawlrun.get = function(crawlRunId) {
    return endpoint.get('https://store.import.io/crawlrun/'+crawlRunId);
};

// store.import.io/crawlRun/{crawlRunId}/_attachment/csv/{attachmentId}
endpoint.store.crawlrun.attachment = {};
endpoint.store.crawlrun.attachment.csv = {};
endpoint.store.crawlrun.attachment.csv.get = function(crawlRunId, attachmentId) {
    var request = {
        path: 'https://store.import.io/crawlrun/'+crawlRunId+'/_attachment/csv/'+attachmentId,
        forceDownload: true,
        downloadSync: true,
        fileName: 'results.csv'
    };
    return endpoint.get(request);
};

// store.import.io/crawlRun/{crawlRunId}/_attachment/json/{attachmentId}
endpoint.store.crawlrun.attachment = {};
endpoint.store.crawlrun.attachment.json = {};
endpoint.store.crawlrun.attachment.json.get = function(crawlRunId, attachmentId) {
    var request = {
        path: 'https://store.import.io/crawlrun/'+crawlRunId+'/_attachment/csv/'+attachmentId,
        forceDownload: true,
        downloadSync: true,
        fileName: 'results.ndjson'
    };
    var file = endpoint.get(request);
    return convertNdjsonFileToJson(file.fileId);
};

// store.import.io/extractor/{extractorId}/_attachment/inputs
endpoint.store.extractor = {};
endpoint.store.extractor.attachment = {};
endpoint.store.extractor.attachment.inputs = {};
endpoint.store.extractor.attachment.inputs.put = function(extractorId, json) {
    var ndjson = convertJsonToNdjson(json);
    return endpoint.put({
        path: 'https://store.import.io/extractor/'+extractorId+'/_attachment/inputs',
        headers: {
            'Content-Type': 'application/x-ndjson'
        },
        body: ndjson
    });
};

//////////////////////////////////////////
// Helpers
//////////////////////////////////////////

var convertNdjsonFileToJson = function(fileId) {
    var json = [];
    var fileReader = sys.files.open(fileId, 'text/plain');
    try {
        var line;
        while (line = fileReader.readLine()) {
            json.push(JSON.parse(line));
        }
    } finally {
        fileReader.close();
    }
    return json;
};

var convertJsonToNdjson = function(json) {
    var ndjson = '';
    json.forEach(function(item) {
        ndjson += JSON.stringify(item)+'\n';
    });
    return ndjson;
};

var checkHttpOptions = function (url, options) {
    options = options || {};
    if (!!url) {
        if (isObject(url)) {
            // take the 'url' parameter as the options
            options = url || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contains the http package format
                options.path = url;
            } else {
                // create html package
                options = {
                    path: url,
                    body: options
                }
            }
        }
    }
    return options;
};

var isObject = function (obj) {
    return !!obj && stringType(obj) === '[object Object]'
};

var stringType = Function.prototype.call.bind(Object.prototype.toString);