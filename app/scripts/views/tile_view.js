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
        if (this.element) {
            this.element.remove();
        }
        this.element = $('<div class="tile"></div>');
        if (this.properties.tile.hasValue()) {
            var numberTile = $('<div class="number-tile"></div>');
            this.element.append(numberTile);
            var toAppendSpan = $('<span class="number"></span>');
            numberTile.append(toAppendSpan);
            toAppendSpan.text(this.properties.tile.value);
            if (this.properties.tile.isFixed) {
                toAppendSpan.addClass('fixed');
            }
        } else if (this.properties.tile.hasDraft()) {
            var draftTile = $('<div class="draft-tile"></div>');
            var index, numberSpan, x, y;
            this.element.append(draftTile);
            for (index = 0; index < this.properties.tile.draft.length; index++) {
                numberSpan = $('<span class="number"></span>');
                draftTile.append(numberSpan);
                numberSpan.text(this.properties.tile.draft[index]);
                y = parseInt(index / 3);
                x = index % 3;
                numberSpan.addClass('number-position-' + y + '-' + x);
            }
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
    TileView.prototype.destroy = function() {
        this.element.remove();
    };
    return TileView;

});