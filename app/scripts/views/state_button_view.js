define(['views/view_base', 'jquery'], function(ViewBase, $) {
    'use strict';

    function StateButtonView(config) {
        ViewBase.call(this);
        var view = this;
        view.element = config.element;
        $.extend(view.properties, config.properties);
        view.properties.state = false;
        if (view.element) {
            view.element.on('click', function() {
                view.properties.state = !view.properties.state;
                view.isDirty = true;
                view.triggerEvent('click');
            });
        }
    }

    StateButtonView.prototype = Object.create(ViewBase.prototype);

    StateButtonView.prototype.draw = function() {
        ViewBase.prototype.draw.call(this);
        var iconClass = this.properties.state ?
            this.properties.iconOn :
            this.properties.iconOff;
        this.element.empty();
        this.element.append('<span class="' + iconClass + '"></span>');
    };

    StateButtonView.prototype.destroy = function() {
        this.element.off('click');
    };
    return StateButtonView;
});