define(['views/view_base', 'jquery'], function(ViewBase, $) {
    'use strict';

    function ButtonView(config) {
        ViewBase.call(this);
        var view = this;
        view.element = config.element;
        $.extend(view.properties, config.properties);
        if (view.element) {
            view.element.on('click', function() {
                view.triggerEvent('click');
            });
        }
    }

    ButtonView.prototype = Object.create(ViewBase.prototype);
    return ButtonView;
});