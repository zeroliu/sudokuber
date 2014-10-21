define(['jquery'], function($) {
    'use strict';

    function KeyboardInput() {
        this.events = {};
        this.listen();
    }

    KeyboardInput.prototype.registerEvent = function(target, callback, event) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push({
            target: target,
            callback: callback
        });
    };

    KeyboardInput.prototype.triggerEvent = function(event, data) {
        var eventTriggers = this.events[event];
        if (eventTriggers) {
            eventTriggers.forEach(function(eventTrigger) {
                eventTrigger.callback.call(eventTrigger.target, data);
            });
        }
    };

    KeyboardInput.prototype.listen = function() {
        var manager = this;
        var ZERO_KEYCODE = 48;

        $('body').on('keydown', function(event) {
            var keyCodeDiff = event.keyCode - ZERO_KEYCODE;
            if (keyCodeDiff >= 1 && keyCodeDiff <= 9) {
                manager.triggerEvent('keyDown', keyCodeDiff);
            } else {
                manager.triggerEvent('keyDown', 0);
            }
        });
    };

    return KeyboardInput;
});