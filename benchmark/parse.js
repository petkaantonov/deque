var Benchmark = require("benchmark");
var queryStr = process.argv[3];
var libName = process.argv[2];

if(libName === "qs") {
    var lib = require("qs");
}
else {
    var lib = require("../js/querystringparser.js");
    console.log("");
    console.log("Running suite with query string: ");
    console.log("");
    console.log(queryStr);
    console.log("");
}

console.log("warming up");
l = 10000;

while(l--) {
    lib.parse(queryStr);
}

console.log("");
console.log("benchmarking");
console.log("");

var suite = new Benchmark.Suite();

suite.add(libName, function() {
    lib.parse(queryStr);
})
.on("cycle", function(e) {
    console.log("" + e.target);
})
.run();
