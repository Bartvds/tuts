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
var Test = (function () {
    function Test(item) {
        this._open = [];
        this._passed = [];
        this._failed = [];
        this._expecting = -1;
        this._completed = false;
        this._async = 0;
        this._item = item;
    }
    Test.prototype.expect = function (amount) {
        this._expecting = amount;
    };
    Test.prototype.run = function (callback) {
        this._callback = callback;
        this._item.execute(this);
        this.check();
    };
    Test.prototype.check = function () {
        if(this._completed) {
            return;
        }
        if(this._async > 0 && this._open.length > 0) {
            return;
        }
        this._completed = true;
        this._callback(this);
    };
    Test.prototype.isTrue = function (a, label) {
        this.mark(a !== true, label);
    };
    Test.prototype.async = function (label, seconds) {
        this._async += 1;
        var async = new Async(this, label, seconds);
        this._open.push(async);
        var self = this;
        return function (error) {
            self.finishAsync(async);
        };
    };
    Test.prototype.finishAsync = function (async) {
        if(this._completed) {
            throw (new Error('async finish but test already marked completed: ' + async.label));
        }
        var i = this._open.indexOf(async);
        if(i < 0) {
            throw (new Error('async not in open list: ' + async.label));
        }
        this._open.splice(i, 1);
        async.clear();
        this.check();
    };
    Test.prototype.mark = function (passed, label) {
        if(passed) {
            this._passed.push(label);
        } else {
            this._failed.push(label);
        }
    };
    Test.prototype.getFailedLabels = function () {
        return this._failed.slice(0);
    };
    Test.prototype.isAsync = function () {
        return this._open.length > 0;
    };
    Test.prototype.totalTested = function () {
        return this._passed.length + this._failed.length;
    };
    Test.prototype.numExpecting = function () {
        return this._expecting;
    };
    Test.prototype.numPassed = function () {
        return this._passed.length;
    };
    Test.prototype.numFailed = function () {
        return this._failed.length;
    };
    Test.prototype.isCompleted = function () {
        return this._completed;
    };
    Test.prototype.hasExpected = function () {
        return (this._expecting < 1 || this.totalTested() === this._expecting);
    };
    Test.prototype.hasPassed = function () {
        return this._completed && (this._failed.length == 0 && this.hasExpected());
    };
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
var Logger = (function () {
    function Logger(enabled) {
        this._enabled = !!enabled;
    }
    Logger.prototype.enabled = function (value) {
        if(arguments.length == 1) {
            this._enabled = !!value;
        }
        return this._enabled;
    };
    Logger.prototype.log = function (value, sender) {
        if(!this.enabled) {
            return;
        }
        var arr = [
            value
        ];
        if(sender) {
            arr.push(sender);
        }
        console.log(arr);
    };
    return Logger;
})();
var System = (function () {
    function System() { }
    System.init = function init() {
        if(!System.console) {
            System.console = new Logger();
        }
    };
    return System;
})();
var util;
(function (util) {
    function eachArray(collection, callback, thisArg) {
        for(var i = 0, ii = collection.length; i < ii; i++) {
            if(callback.call(thisArg, collection[i], i, collection) === false) {
                return;
            }
        }
    }
    util.eachArray = eachArray;
    function eachHash(collection, callback, thisArg) {
        for(var key in collection) {
            if(collection.hasOwnProperty(key)) {
                if(callback.call(thisArg, collection[key], key, collection) === false) {
                    return;
                }
            }
        }
    }
    util.eachHash = eachHash;
})(util || (util = {}));
var tuts;
(function (tuts) {
    var Runner = (function () {
        function Runner() {
            this._groups = [];
            this._results = [];
            this._running = [];
            System.console.log('Runner ' + Math.round(Math.random() * Math.pow(10, Math.random() * 8)), this);
        }
        Runner.prototype.getGroup = function (label) {
            var group = new Group(label);
            this._groups.push(group);
            return group;
        };
        Runner.prototype.run = function (reporter) {
            var _this = this;
            System.console.log('run', this);
            var self = this;
            util.eachArray(this._groups, function (group) {
                util.eachArray(group.getItems(), function (item) {
                    var test = new Test(item);
                    test.run(function (test) {
                    });
                }, _this);
            }, this);
        };
        return Runner;
    })();
    tuts.Runner = Runner;    
})(tuts || (tuts = {}));
var tuts;
(function (tuts) {
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
    tuts.BrowserReporter = BrowserReporter;    
})(tuts || (tuts = {}));
'use strict';
require.config({
    baseUrl: '.',
    paths: {
    },
    shim: {
    }
});
require([], function () {
    System.init();
    System.console.log('tuts.ts starting..');
    var load = [
        'basic.js'
    ];
    var runner = new tuts.Runner();
    util.eachArray(load, function (path) {
        System.console.log('loading module: ' + path);
        require([
            'tests/' + path
        ], function (mod) {
            var group = runner.getGroup(path);
            if(!mod.init) {
                System.console.log('missing init() on module: ' + path);
            } else if(mod.init(group)) {
                System.console.log('added module: ' + path);
            }
        });
    });
    runner.run(new tuts.BrowserReporter(document.getElementById('result')));
    System.console.log('tuts.ts ok!');
});
