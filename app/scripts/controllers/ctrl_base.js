define([], function() {
    'use strict';

    function CtrlBase() {
        this.views = [];
    }

    CtrlBase.prototype.render = function() {
        this.views.forEach(function(view) {
            if (view.isDirty) {
                view.draw();
            }
        });
    };

    CtrlBase.prototype.addView = function(view) {
        this.views.push(view);
    };

    return CtrlBase;
});