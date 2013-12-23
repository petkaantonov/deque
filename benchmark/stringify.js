var Benchmark = require("benchmark");
var obj = JSON.parse(process.argv[3]);
var libName = process.argv[2];

if(libName === "qs") {
    var lib = require("qs");
}
else {
    var lib = require("../js/querystringparser.js");
    console.log("");
    console.log("Running suite with obj: ");
    console.log("");
    console.log(JSON.stringify(obj));
    console.log("");
    console.log("Which stringifies to", lib.stringify(obj));
}

console.log("warming up");
l = 10000;

while(l--) {
    lib.stringify(obj);
}

console.log("");
console.log("benchmarking");
console.log("");

var suite = new Benchmark.Suite();

suite.add(libName, function() {
    lib.stringify(obj);
})
.on("cycle", function(e) {
    console.log("" + e.target);
})
.run();
