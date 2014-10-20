define(['jquery'], function($) {
    'use strict';

    function Renderer() {
        this.gridContainer = $('.grid-container');
    }

    Renderer.prototype.draw = function(grid) {
        var renderer = this;
        window.requestAnimationFrame(function() {
            grid.eachSquared(function(x, y, squared) {
                renderer.addSquared(squared);
            });
        });
    };

    Renderer.prototype.addSquared = function(squared) {
        var squaredContainer = this.findSquaredContainer(squared.x, squared.y);
        var renderer = this;
        squared.eachTile(function(x, y, tile) {
            var toAppendDiv, toAppendSpan;
            var tileContainer = renderer.findTileContainer(x, y, squaredContainer);
            tileContainer.empty();
            tileContainer.removeClass('selected');
            if (tile !== null) {
                if (tile.isSelected) {
                    tileContainer.addClass('selected');
                }
                if (tile.value !== undefined) {
                    toAppendDiv = $('<div class="number-tile"></div>');
                    tileContainer.append(toAppendDiv);
                    toAppendSpan = $('<span class="number"></span>');
                    toAppendDiv.append(toAppendSpan);
                    toAppendSpan.text(tile.value);
                    if (tile.isFixed) {
                        toAppendSpan.addClass('fixed');
                    }
                } else if (tile.draft && tile.draft.length > 0) {
                    //TODO
                }
            }
        });
    };

    Renderer.prototype.findSquaredContainer = function(x, y) {
        return this.gridContainer.find(
            '.grid-row:eq(' + y + ') ' +
            '.grid-cell:eq(' + x + ') ' +
            '.squared-container');
    };

    Renderer.prototype.findTileContainer = function(x, y, squaredContainer) {
        return squaredContainer.find(
            '.squared-row:eq(' + y + ') ' +
            '.squared-cell:eq(' + x + ')');
    };

    return Renderer;
});