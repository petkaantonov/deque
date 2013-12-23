var cp = require("child_process");
var B = require("bluebird");


var stdio = [
    'ignore',
    process.stdout,
    process.stderr
];

function suite(queryStr, lib) {
    if (!lib) {
        lib = "querystringparser";
    }
    var d = B.pending();
    var args = ["--expose_gc", "parse.js", lib, queryStr];
    var p = cp.spawn("node", args, {stdio: stdio});
    p.on('exit', d.fulfill.bind(d));
    return d.promise.then(function(){
        if(lib === "querystringparser") {
            return suite(queryStr, "qs");
        }
    });
}

function printPlatform() {
    console.log("\nPlatform info:");
    var os = require("os");
    var v8 = process.versions.v8;
    var node = process.versions.node;
    var plat = os.type() + " " + os.release() + " " + os.arch() + "\nNode.JS " + node + "\nV8 " + v8;
    var cpus = os.cpus().map(function(cpu){
        return cpu.model;
    }).reduce(function(o, model){
        if( !o[model] ) o[model] = 0;
        o[model]++;
        return o;
    }, {});
    cpus = Object.keys(cpus).map(function( key ){
        return key + " \u00d7 " + cpus[key];
    }).join("\n");
    console.log(plat + "\n" + cpus + "\n");
}

printPlatform();

suite('a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3')
.then(function(){
    return suite('foo=bar');
})
.then(function(){
    return suite('user[name][first]=tj&user[name][last]=holowaychuk');
})
.then(function(){
    return suite('a[]=1&a[]=2&a[]=3');
});



