define([], function() {
    'use strict';

    function CtrlBase() {
        this.$$views = [];
    }

    CtrlBase.prototype.render = function() {
        this.$$views.forEach(function(view) {
            if (view.isDirty) {
                view.draw();
            }
        });
    };

    CtrlBase.prototype.addView = function(view) {
        this.$$views.push(view);
    };

    CtrlBase.prototype.removeView = function(view) {
        view.destory();
        this.$$views.splice(this.$$views.indexOf(view), 1);
    };

    CtrlBase.prototype.removeAllViews = function() {
        this.$$views.forEach(function(view) {
            view.destroy();
        });
        this.$$views.length = 0;
    };

    return CtrlBase;
});