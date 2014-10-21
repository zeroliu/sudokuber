define([], function() {
    'use strict';

    function Renderer() {
        this.ctrls = [];
    }

    Renderer.prototype.draw = function() {
        var renderer = this;
        window.requestAnimationFrame(function() {
            renderer.ctrls.forEach(function(ctrl) {
                ctrl.render();
            });
            renderer.draw();
        });
    };

    Renderer.prototype.addCtrl = function(ctrl) {
        this.ctrls.push(ctrl);
    };

    return Renderer;
});