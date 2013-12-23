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
    var args = ["--expose_gc", "stringify.js", lib, JSON.stringify(queryStr)];
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

suite({
    cht: 'p3',
    chd: 't:60,40',
    chs: '250x100',
    chl: 'Hello|World'
})
.then(function(){
    return suite({
    'foo': ['bar'],
    'baz': ['1', '2', '3']
    });
})
.then(function(){
    return suite({
        'x': {
            'y': [{
                'z': '1',
                'w': '2'
            }]
        }
    });
})
.then(function(){
    return suite({
        'foo': 'bar',
        'bar': 'baz'
    });
});



