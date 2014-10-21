define([], function() {
    'use strict';

    function ViewBase() {
        this.properties = {};
        this.parent = undefined;
        this.events = {};
        this.isDirty = true;
    }

    ViewBase.prototype.draw = function() {
        this.isDirty = false;
    };
    ViewBase.prototype.registerEvent = function(target, callback, event) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push({
            target: target,
            callback: callback
        });
    };
    ViewBase.prototype.updateProperties = function(properties) {
        for (var key in properties) {
            if (properties.hasOwnProperty(key)) {
                this.properties[key] = properties[key];
            }
        }
        this.isDirty = true;
    };
    return ViewBase;
});