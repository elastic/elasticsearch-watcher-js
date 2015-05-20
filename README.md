# elasticsearch-watcher

Watcher API plugin for the [elasticsearch.js](https://github.com/elastic/elasticsearch-js) client.

<!--
[![Build Status](http://img.shields.io/travis/elastic/elasticsearch-watcher/master.svg?style=flat-square)](https://travis-ci.org/elastic/elasticsearch-master?branch=master)
[![Coverage Status](http://img.shields.io/coveralls/elastic/elasticsearch-watcher/master.svg?style=flat-square)](https://coveralls.io/r/elastic/elasticsearch-master?branch=4.0)
[![Dependencies up to date](http://img.shields.io/david/elastic/elasticsearch-master.svg?style=flat-square)](https://david-dm.org/elastic/elasticsearch-master)
-->

## Install

elasticsearch-watcher is available on NPM:

```
npm install elasticsearch elasticsearch-watcher
```

bower:

```
bower install elasticsearch elasticsearch-watcher
```

Or by simply downloading [elasticsearch-watcher.js](elasticsearch-watcher.js) and including it in your project.

**NOTE:** The elasticsearch-watcher.js file uses a UMD wrapper to greater compatibility and exports a global `ElasticsearchWatcher` variable when neither AMD or Common.js module systems are detected.

## Usage

The elasticsearch-watcher API is a plugin for the [elasticsearch.js](https://github.com/elastic/elasticsearch-js) client. To mix it into an instance of `Client` we pass the entire module like so:

```
var elasticsearch = require('elasticsearch');
var elasticsearchWatcher = require('elasticsearch-watcher');

var client = new elasticsearch.Client({
  plugins: [ elasticsearchWatcher ]
});
```

Doing this will add the `client.watcher` api to the client instance:
```
client.watcher.getWatch({ id: 42 })
.then(function (resp) {
  ...
});
```

## API

Documentation for the watcher api is available at [elastic/elasticsearch-watcher-js/docs/api.asciidoc](https://github.com/elastic/elasticsearch-watcher-js/blob/master/docs/api.asciidoc) for the time being.

## License

Copyright 2015 Elasticsearch

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
