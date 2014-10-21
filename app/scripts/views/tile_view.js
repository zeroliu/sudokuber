define(['views/view_base', 'jquery'], function(ViewBase, $) {
    'use strict';

    function TileView(parent) {
        ViewBase.call(this);
        this.parent = parent;
        this.value = undefined;
        this.isFixed = undefined;
        this.element = undefined;
    }

    TileView.prototype = Object.create(ViewBase.prototype);

    TileView.prototype.draw = function() {
        var view = this;
        ViewBase.prototype.draw.call(this);
        console.log('draw tile');
        if (this.element) {
            this.element.remove();
        }
        if (this.value !== null) {
            this.element = $('<div class="number-tile"></div>');
            var toAppendSpan = $('<span class="number"></span>');
            this.element.append(toAppendSpan);
            toAppendSpan.text(this.value);
            if (this.isFixed) {
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
        this.tile = tile;
        this.value = tile.value;
        this.isFixed = tile.isFixed;
        this.isDirty = true;
    };
    return TileView;

});