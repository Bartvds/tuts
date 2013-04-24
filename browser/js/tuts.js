var Async = (function () {
    function Async(test, label, timeout) {
        this.test = test;
        this.label = label;
        this.timeout = timeout;
    }
    Async.prototype.clear = function () {
        this.test = null;
    };
    return Async;
})();
var Item = (function () {
    function Item(group, execute, label) {
        this.group = group;
        this.execute = execute;
        this.label = label;
    }
    return Item;
})();
var TestResult = (function () {
    function TestResult(item) {
        this.item = item;
        this.open = [];
        this.passed = [];
        this.failed = [];
        this.expecting = -1;
        this.completed = false;
    }
    TestResult.prototype.async = function (label, seconds) {
        var async = new Async(this, label, seconds);
        this.open.push(async);
        var that = this;
        return function (error) {
            async.clear();
            var i = that.open.indexOf(async);
            if(i > -1) {
                that.open.splice(i, 1);
                that.done();
            }
        };
    };
    TestResult.prototype.done = function () {
        if(this.completed) {
            return true;
        }
        if(this.open.length !== 0) {
            return false;
        }
        this.completed = true;
        return true;
    };
    TestResult.prototype.mark = function (passed, label) {
        if(passed) {
            this.passed.push(label);
        } else {
            this.failed.push(label);
        }
    };
    TestResult.prototype.getFailedLabels = function () {
        return this.failed.slice(0);
    };
    TestResult.prototype.isAsync = function () {
        return this.open.length > 0;
    };
    TestResult.prototype.totalTested = function () {
        return this.passed.length + this.failed.length;
    };
    TestResult.prototype.isError = function () {
        return this.completed && (this.failed.length >= 0 || (this.expecting >= 0 && this.totalTested() == this.expecting));
    };
    return TestResult;
})();
var Test = (function () {
    function Test(item) {
        this.item = item;
        this._result = new TestResult(item);
    }
    Test.prototype.async = function (label, seconds) {
        return this._result.async(label, seconds);
    };
    Test.prototype.expect = function (amount) {
        this._result.expecting = amount;
    };
    Test.prototype.isTrue = function (a, label) {
        this._result.mark(a !== true, label);
    };
    Object.defineProperty(Test.prototype, "result", {
        get: function () {
            return this._result;
        },
        enumerable: true,
        configurable: true
    });
    return Test;
})();
var Group = (function () {
    function Group(label) {
        this.label = label;
        this._items = [];
    }
    Group.prototype.add = function (label, execute) {
        var item = new Item(this, execute, label);
        this._items.push(item);
    };
    Group.prototype.getItems = function () {
        return this._items;
    };
    return Group;
})();
var Result = (function () {
    function Result() {
    }
    Result.prototype.add = function (group) {
        var result = new GroupResult(group);
        this.groups.push(result);
    };
    Result.prototype.hasErrors = function () {
        return false;
    };
    Result.prototype.report = function (reporter) {
    };
    return Result;
})();
var GroupResult = (function () {
    function GroupResult(group) {
        this.group = group;
        this.items = [];
    }
    GroupResult.prototype.finish = function (callback) {
    };
    return GroupResult;
})();
var Util;
(function (Util) {
    function eachArray(collection, callback, thisArg) {
        for(var i = 0, ii = collection.length; i < ii; i++) {
            if(callback.call(thisArg, collection[i], i, collection) === false) {
                return;
            }
        }
    }
    Util.eachArray = eachArray;
    function eachHash(collection, callback, thisArg) {
        for(var key in collection) {
            if(collection.hasOwnProperty(key)) {
                if(callback.call(thisArg, collection[key], key, collection) === false) {
                    return;
                }
            }
        }
    }
    Util.eachHash = eachHash;
})(Util || (Util = {}));
var Tuts;
(function (Tuts) {
    var Runner = (function () {
        function Runner() {
            this._groups = [];
            this._results = [];
            this._items = [];
        }
        Runner.prototype.getGroup = function (label) {
            var group = new Group(label);
            this._groups.push(group);
            return group;
        };
        Runner.prototype.run = function (reporter) {
            var _this = this;
            var self = this;
            Util.eachArray(this._groups, function (group) {
                Util.eachArray(group.getItems(), function (item) {
                    var test = new Test(item);
                    var result = test.result;
                    self._items.push(result);
                    item.execute(test);
                    if(result.completed) {
                        if(result.isError()) {
                        } else {
                        }
                    } else if(result.isAsync()) {
                    } else {
                    }
                }, _this);
            }, this);
        };
        return Runner;
    })();
    Tuts.Runner = Runner;    
})(Tuts || (Tuts = {}));
var Tuts;
(function (Tuts) {
    var BrowserReporter = (function () {
        function BrowserReporter(element) {
            this.element = element;
        }
        BrowserReporter.prototype.getLabel = function () {
            return 'BrowserReporter';
        };
        BrowserReporter.prototype.toString = function () {
            return this.getLabel();
        };
        return BrowserReporter;
    })();
    Tuts.BrowserReporter = BrowserReporter;    
})(Tuts || (Tuts = {}));
'use strict';
require.config({
    baseUrl: '.',
    paths: {
    },
    shim: {
    }
});
require([], function () {
    console.log('tuts.ts starting..');
    var load = [
        'basic.js'
    ];
    var runner = new Tuts.Runner();
    Util.eachArray(load, function (path) {
        console.log('loading module: ' + path);
        require([
            'tests/' + path
        ], function (mod) {
            var group = runner.getGroup(path);
            if(!mod.init) {
                console.log('missing init() on module: ' + path);
            } else if(mod.init(group)) {
                console.log('added module: ' + path);
            }
        });
    });
    runner.run(new Tuts.BrowserReporter(document.getElementById('result')));
    console.log('tuts.ts ok!');
});
