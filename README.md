[![Build Status](https://travis-ci.org/petkaantonov/querystringparser.png?branch=master)](https://travis-ci.org/petkaantonov/querystringparser)

#Introduction

Extremely fast querystring parser with same API and semantics as [`qs`](http://npmjs.org/package/qs) + DoS Protection.

#Quick start

    npm install querystringparser

```js
var querystringparser = require("querystringparser");
querystringparser.parse("foo=bar");
```

#API

Exactly the same API and semantics are implemented 100% to make comparison fair.

DoS protection checks for input length, amount of total keys and maximum nesting depth of keys.

```js
var qs = require("querystringparser");
qs.maxLength //Maximum amount of characters in the input string to parse: 32768
qs.maxKeys //Maximum amount of key-value pairs in the query string: 256
qs.maxDepth //Maximum nesting depth of keys: 4 e.g. a[b][c][d]=3
```

a `RangeError` is thrown when these limits are reached.

#Performance

To run benchmarks run the `bench` bash script while on the project root.

Platform info:

    Windows_NT 6.1.7601 x64
    Node.JS 0.11.8
    V8 3.21.18.3
    Intel(R) Core(TM) i5-2500K CPU @ 3.30GHz × 4

#Parse

Input:

    a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&
    a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&
    a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&
    a[]=3&a[]=3&a[]=3&a[]=3&a[ ]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3
    &a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3
    &a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3
    &a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]= 3&a[]=3&a[]=3&a[]=3&a[]=
    3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=
    3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=
    3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=
    3& a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3

Results:

    querystringparser x 45,415 ops/sec ±0.10% (103 runs sampled)
    qs x 3,372 ops/sec ±0.16% (100 runs sampled)

Input:

    foo=bar

Results:

    querystringparser x 1,708,245 ops/sec ±0.14% (97 runs sampled)
    qs x 331,300 ops/sec ±0.19% (101 runs sampled)

Input:

    user[name][first]=tj&user[name][last]=holowaychuk

Results:

    querystringparser x 336,640 ops/sec ±0.13% (95 runs sampled)
    qs x 77,368 ops/sec ±0.16% (100 runs sampled)

Input:

    a[]=1&a[]=2&a[]=3

Results:

    querystringparser x 1,418,693 ops/sec ±0.14% (98 runs sampled)
    qs x 96,978 ops/sec ±0.14% (100 runs sampled)


#Stringify

Input:

    {"cht":"p3","chd":"t:60,40","chs":"250x100","chl":"Hello|World"}

Results:

    querystringparser x 282,700 ops/sec ±0.21% (99 runs sampled)
    qs x 220,947 ops/sec ±0.26% (101 runs sampled)

Input:

    {"foo":["bar"],"baz":["1","2","3"]}

Results:

    querystringparser x 558,012 ops/sec ±0.42% (94 runs sampled)
    qs x 410,148 ops/sec ±0.31% (98 runs sampled)

Input:

    {"x":{"y":[{"z":"1","w":"2"}]}}

Results:

    querystringparser x 479,991 ops/sec ±0.13% (99 runs sampled)
    qs x 346,668 ops/sec ±0.21% (99 runs sampled)

Input:

    {"foo":"bar","bar":"baz"}

Results:

    querystringparser x 999,859 ops/sec ±0.19% (97 runs sampled)
    qs x 690,273 ops/sec ±0.43% (96 runs sampled)

