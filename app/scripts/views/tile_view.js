define(['views/view_base', 'jquery'], function(ViewBase, $) {
    'use strict';

    function TileView(config) {
        ViewBase.call(this);
        this.parent = config.parent;
        this.element = config.element;

        $.extend(this.properties, config.properties);
    }

    TileView.prototype = Object.create(ViewBase.prototype);

    TileView.prototype.draw = function() {
        var view = this;
        ViewBase.prototype.draw.call(this);
        console.log('draw tile');
        if (this.element) {
            this.element.remove();
        }
        if (this.properties.tile.value !== null) {
            this.element = $('<div class="number-tile"></div>');
            var toAppendSpan = $('<span class="number"></span>');
            this.element.append(toAppendSpan);
            toAppendSpan.text(this.properties.tile.value);
            if (this.properties.tile.isFixed) {
                toAppendSpan.addClass('fixed');
            }
        } else {
            this.element = $('<div class="empty-tile"></div>');
        }
        this.parent.append(this.element);
        this.element.on('click', function() {
            view.triggerEvent('click');
        });

    };
    TileView.prototype.configWithTile = function(tile) {
        this.properties.tile = tile;
        this.isDirty = true;
    };
    return TileView;

});