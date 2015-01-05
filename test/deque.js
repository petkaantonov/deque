var Deque = require('../js/deque.js');
var assert = require("assert");

describe('Deque.prototype.constructor', function() {
    it("should take no argument", function() {
        var a = new Deque();
        assert(a._capacity === 16);
    });

    it("should take a capacity argument", function() {
        var a = new Deque(32);
        assert(a._capacity === 32);
    });

    it("should take array argument", function() {
        var a = new Deque([1,2,3,4]);
        var b = new Deque([]);

        assert(a._capacity >= 4);
        assert.deepEqual(a.toArray(), [1,2,3,4]);
        assert(b._capacity > 0);
        assert.deepEqual(b.toArray(), []);
    });
});

describe('Deque.prototype.toArray', function () {
    it("should return an array", function() {
        var a = new Deque([1,2,3,4]);
        assert.deepEqual(a.toArray(), [1,2,3,4]);
    });
});

describe('Deque.prototype.push', function () {
    it("Should do nothing if no arguments", function() {
        var a = new Deque();
        var before = a.length;
        var ret = a.push();
        assert(ret === before);
        assert(a.length === ret);
        assert(ret === 0);
    });

    it("Should add single argument - plenty of capacity", function() {
        var a = new Deque([1,2,3,4,5]);
        assert(a._capacity - a.length > 1);
        var before = a.length;
        var ret = a.push(1);
        assert(ret === before + 1);
        assert(a.length === ret);
        assert(ret === 6);
        assert.deepEqual(a.toArray(), [1,2,3,4,5,1]);
    });

    it("Should add single argument - exact capacity", function() {
        var a = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
        assert(a._capacity - a.length === 1);
        var before = a.length;
        var ret = a.push(1);
        assert(ret === before + 1);
        assert(a.length === ret);
        assert(ret === 16);
        assert.deepEqual(a.toArray(), [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15, 1]);
    });

    it("Should add single argument - over capacity", function() {
        var a = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
        assert(a._capacity - a.length === 0);
        var before = a.length;
        var ret = a.push(1);
        assert(ret === before + 1);
        assert(a.length === ret);
        assert(ret === 17);
        assert.deepEqual(a.toArray(), [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15, 16, 1]);
    });

    it("Should add multiple arguments - plenty of capacity", function() {
        var a = new Deque([1,2,3,4,5]);
        assert(a._capacity - a.length > 2);
        var before = a.length;
        var ret = a.push(1, 2);
        assert(ret === before + 2);
        assert(a.length === ret);
        assert(ret === 7);
        assert.deepEqual(a.toArray(), [1,2,3,4,5,  1, 2]);
    });

    it("Should add multiple argument - exact capacity", function() {
        var a = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
        assert(a._capacity - a.length === 2);
        var before = a.length;
        var ret = a.push(1, 2);
        assert(ret === before + 2);
        assert(a.length === ret);
        assert(ret === 16);
        assert.deepEqual(a.toArray(), [1,2,3,4,5,6,7,8,9,10,11,12,13,14,   1, 2]);
    });

    it("Should add multiple arguments - over capacity", function() {
        var a = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
        assert(a._capacity - a.length === 1);
        var before = a.length;
        var ret = a.push(1, 2);
        assert(ret === before + 2);
        assert(a.length === ret);
        assert(ret === 17);
        assert.deepEqual(a.toArray(), [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,   1, 2]);
    });
});

describe('Deque.prototype.unshift', function () {

    it("Should do nothing if no arguments", function() {
        var a = new Deque();
        var before = a.length;
        var ret = a.unshift();
        assert(ret === before);
        assert(a.length === ret);
        assert(ret === 0);
    });

    it("Should add single argument - plenty of capacity", function() {
        var a = new Deque([1,2,3,4,5]);
        assert(a._capacity - a.length > 1);
        var before = a.length;
        var ret = a.unshift(1);
        assert(ret === before + 1);
        assert(a.length === ret);
        assert(ret === 6);
        assert.deepEqual(a.toArray(), [1,    1,2,3,4,5]);
    });

    it("Should add single argument - exact capacity", function() {
        var a = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
        assert(a._capacity - a.length === 1);
        var before = a.length;
        var ret = a.unshift(1);
        assert(ret === before + 1);
        assert(a.length === ret);
        assert(ret === 16);
        assert.deepEqual(a.toArray(), [1,   1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    });

    it("Should add single argument - over capacity", function() {
        var a = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
        assert(a._capacity - a.length === 0);
        var before = a.length;
        var ret = a.unshift(1);
        assert(ret === before + 1);
        assert(a.length === ret);
        assert(ret === 17);
        assert.deepEqual(a.toArray(), [1,   1,2,3,4,5,6,7,8,9,10,11,12,13,14,15, 16]);
    });

    it("Should add multiple arguments - plenty of capacity", function() {
        var a = new Deque([1,2,3,4,5]);
        assert(a._capacity - a.length > 2);
        var before = a.length;
        var ret = a.unshift(1, 2);
        assert(ret === before + 2);
        assert(a.length === ret);
        assert(ret === 7);
        assert.deepEqual(a.toArray(), [1, 2,    1,2,3,4,5]);
    });

    it("Should add multiple argument - exact capacity", function() {
        var a = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
        assert(a._capacity - a.length === 2);
        var before = a.length;
        var ret = a.unshift(1, 2);
        assert(ret === before + 2);
        assert(a.length === ret);
        assert(ret === 16);
        assert.deepEqual(a.toArray(), [1,2,    1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
    });

    it("Should add multiple arguments - over capacity", function() {
        var a = new Deque([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
        assert(a._capacity - a.length === 1);
        var before = a.length;
        var ret = a.unshift(1, 2);
        assert(ret === before + 2);
        assert(a.length === ret);
        assert(ret === 17);
        assert.deepEqual(a.toArray(), [1,2,    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    });
});

describe('Deque.prototype.pop', function () {
    it("Should return undefined when empty deque", function() {
        var a = new Deque();
        assert(a.length === 0);
        assert(a.pop() === void 0);
        assert(a.pop() === void 0);
        assert(a.length === 0);
    });

    it("Should return the item at the back of the deque", function() {
        var a = new Deque();
        var b = new Array();

        a.push(1,2,3,4,5,6,7,8,9);
        b.push(1,2,3,4,5,6,7,8,9);

        assert(a.pop() === 9);
        assert(a.pop() === 8);
        b.pop(); b.pop();
        assert.deepEqual(a.toArray(), b);
        a.unshift(1,2,3,4,5);
        a.push(1,2,3,4,5);
        a.unshift(1,2,3);
        a.pop();
        b.unshift(1,2,3,4,5);
        b.push(1,2,3,4,5);
        b.unshift(1,2,3);
        b.pop();
        assert.deepEqual(a.toArray(), b);
        assert(a.pop() === b.pop());
        assert.deepEqual(a.toArray(), b);
    });
});

describe('Deque.prototype.shift', function () {
    it("Should return undefined when empty deque", function() {
        var a = new Deque();
        assert(a.length === 0);
        assert(a.shift() === void 0);
        assert(a.shift() === void 0);
        assert(a.length === 0);
    });

    it("Should return the item at the front of the deque", function() {
        var a = new Deque();
        var b = new Array();

        a.push(1,2,3,4,5,6,7,8,9);
        b.push(1,2,3,4,5,6,7,8,9);

        assert(a.shift() === 1);
        assert(a.shift() === 2);
        b.shift(); b.shift();
        assert.deepEqual(a.toArray(), b);
        a.unshift(1,2,3,4,5);
        a.push(1,2,3,4,5);
        a.unshift(1,2,3);
        a.shift();
        b.unshift(1,2,3,4,5);
        b.push(1,2,3,4,5);
        b.unshift(1,2,3);
        b.shift();
        assert.deepEqual(a.toArray(), b);
        assert(a.shift() === b.shift());
        assert.deepEqual(a.toArray(), b);
    });
});

describe('Deque.prototype.peekBack', function () {
    it("Should return undefined when empty deque", function() {
        var a = new Deque();
        assert(a.length === 0);
        assert(a.peekBack() === void 0);
        assert(a.peekBack() === void 0);
        assert(a.length === 0);
    });

    it("Should return the item at the back of the deque", function() {
        var a = new Deque();
        a.push(1,2,3,4,5,6,7,8,9);

        assert(a.peekBack() === 9);

        var l = 5;
        while(l--) a.pop();

        assert.deepEqual(a.toArray(), [1, 2, 3, 4]);

        assert(a.peekBack() === 4);

        var l = 2;
        while(l--) a.shift();

        assert(a.peekBack() === 4);

        assert.deepEqual(a.toArray(), [3, 4]);

        a.unshift(1,2,3,4,5,6,78,89,12901,10121,0,12, 1,2,3,4,5,6,78,89,12901,10121,0,12);

        assert.deepEqual(a.toArray(), [1,2,3,4,5,6,78,89,12901,10121,0,12, 1,2,3,4,5,6,78,89,12901,10121,0,12, 3, 4]);

        assert(a.peekBack() === 4);

        a.push(1,3,4);

        assert(a.peekBack() === 4);

        a.pop();
        a.shift();

        assert(a.peekBack() === 3);
        assert.deepEqual(a.toArray(), [2,3,4,5,6,78,89,12901,10121,0,12, 1,2,3,4,5,6,78,89,12901,10121,0,12, 3, 4, 1, 3]);

    });
});

describe('Deque.prototype.peekFront', function () {
    it("Should return undefined when empty deque", function() {
        var a = new Deque();
        assert(a.length === 0);
        assert(a.peekFront() === void 0);
        assert(a.peekFront() === void 0);
        assert(a.length === 0);
    });

    it("Should return the item at the front of the deque", function() {
        var a = new Deque();
        a.push(1,2,3,4,5,6,7,8,9);

        assert(a.peekFront() === 1);

        var l = 5;
        while(l--) a.pop();

        assert.deepEqual(a.toArray(), [1, 2, 3, 4]);

        assert(a.peekFront() === 1);

        var l = 2;
        while(l--) a.shift();

        assert(a.peekFront() === 3);

        assert.deepEqual(a.toArray(), [3, 4]);

        a.unshift(1,2,3,4,5,6,78,89,12901,10121,0,12, 1,2,3,4,5,6,78,89,12901,10121,0,12);

        assert.deepEqual(a.toArray(), [1,2,3,4,5,6,78,89,12901,10121,0,12, 1,2,3,4,5,6,78,89,12901,10121,0,12, 3, 4]);

        assert(a.peekFront() === 1);

        a.push(1,3,4);

        assert(a.peekFront() === 1);

        a.pop();
        a.shift();

        assert(a.peekFront() === 2);
        assert.deepEqual(a.toArray(), [2,3,4,5,6,78,89,12901,10121,0,12, 1,2,3,4,5,6,78,89,12901,10121,0,12, 3, 4, 1, 3]);

    });
});

describe('Deque.prototype.get', function () {
    it("should return undefined on nonsensical argument", function() {
        var a = new Deque([1,2,3,4]);
        assert(a.get(-5) === void 0);
        assert(a.get(-100) === void 0);
        assert(a.get(void 0) === void 0);
        assert(a.get("1") === void 0);
        assert(a.get(NaN) === void 0);
        assert(a.get(Infinity) === void 0);
        assert(a.get(-Infinity) === void 0);
        assert(a.get(1.5) === void 0);
        assert(a.get(4) === void 0);
    });


    it("should support positive indexing", function() {
        var a = new Deque([1,2,3,4]);
        assert(a.get(0) === 1);
        assert(a.get(1) === 2);
        assert(a.get(2) === 3);
        assert(a.get(3) === 4);
    });

    it("should support negative indexing", function() {
        var a = new Deque([1,2,3,4]);
        assert(a.get(-1) === 4);
        assert(a.get(-2) === 3);
        assert(a.get(-3) === 2);
        assert(a.get(-4) === 1);
    });
});

describe('Deque.prototype.isEmpty', function () {
    it("should return true on empty deque", function() {
        var a = new Deque();
        assert(a.isEmpty());
    });

    it("should return false on deque with items", function() {
        var a = new Deque([1]);
        assert(!a.isEmpty());
    });
});

describe('Deque.prototype.clear', function () {
    it("should clear the deque", function() {
        var a = new Deque([1,2,3,4]);
        assert(!a.isEmpty());
        a.clear();
        assert(a.isEmpty());
    });
});

describe('Deque resizing', function () {
    function times(x, value) {
        var a = [];
        for (var i = 0; i < x; ++i) {
            a.push(value === "index" ? i : value);
        }
        return a;
    }
    specify("Resize requires movement", function() {
        var a = new Deque(16);
        a[0] = 4;
        a[1] = 5;
        a[14] = 2;
        a[15] = 3;
        a._length = 16;
        a._front = 14;
        assert.equal(a.peekFront(), 2);
        assert.equal(a.get(3), 5);
        assert.equal(a._capacity, 16);
        assert.deepEqual(a.toArray(), [2,3,4,5].concat(times(12)));
        a.push(6);
        assert.notEqual(a._capacity, 16);
        a.unshift(1);
        assert.deepEqual(a.toArray(), [1,2,3,4,5].concat(times(12), 6));
    });
    specify("Resize doesn't require movement", function() {
        var original = times(16, "index");
        var a = new Deque(original);
        a.push(17);
        a.unshift(-1);
        assert.deepEqual(a.toArray(), [-1].concat(original, 17));
    });
});
