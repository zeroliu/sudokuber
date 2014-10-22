define(['views/view_base', 'jquery'], function(ViewBase, $) {
    'use strict';

    function BoardView(config) {
        ViewBase.call(this);
        this.element = config.element || $('.grid-container');
        $.extend(this.properties, config.properties);
        this.selectedTilePosition = undefined;
    }

    BoardView.prototype = Object.create(ViewBase.prototype);

    BoardView.prototype.updateSelectedTile = function(tile) {
        this.selectedTilePosition = {
            squared: {
                x: tile.parent.x,
                y: tile.parent.y
            },
            tile: {
                x: tile.x,
                y: tile.y
            }
        };
        this.isDirty = true;
    };

    //TODO: not duplicate with GridCtrl
    BoardView.prototype.findTileContainerWithTilePosition = function(tilePosition) {
        return this.findTileContainer(tilePosition.squared.x, tilePosition.squared.y, tilePosition.tile.x, tilePosition.tile.y);
    };

    BoardView.prototype.findTileContainer = function(xs, ys, xt, yt) {
        var squaredContainer = this.element.find(
            '.grid-row:eq(' + ys + ') ' +
            '.grid-cell:eq(' + xs + ') ' +
            '.squared-container');
        return squaredContainer.find(
            '.squared-row:eq(' + yt + ') ' +
            '.squared-cell:eq(' + xt + ')');
    };

    BoardView.prototype.findHighlightedTileContainers = function(tilePosition) {
        var containers = [];
        var view = this;
        view.properties.grid.eachSquared(function(xs, ys, squared) {
            squared.eachTile(function(xt, yt, tile) {
                if ((xs === tilePosition.squared.x && xt === tilePosition.tile.x) ||
                    (ys === tilePosition.squared.y && yt === tilePosition.tile.y)) {
                    if (tile.value) {
                        containers.push(view.findTileContainer(xs, ys, xt, yt));
                    }
                }
            });
        });

        return containers;
    };

    BoardView.prototype.findSameNumberTileContainers = function(value) {
        var containers = [];
        var view = this;
        view.properties.grid.eachSquared(function(xs, ys, squared) {
            squared.eachTile(function(xt, yt, tile) {
                if (tile.value === value) {
                    containers.push(view.findTileContainer(xs, ys, xt, yt));
                }
            });
        });
        return containers;
    };

    BoardView.prototype.draw = function() {
        ViewBase.prototype.draw.call(this);
        this.cleanBoard();
        if (this.selectedTilePosition) {
            this.findTileContainerWithTilePosition(this.selectedTilePosition).addClass('selected');
            var squared = this.properties.grid.findSquared(this.selectedTilePosition.squared.x, this.selectedTilePosition.squared.y);
            var tile = squared.findTile(this.selectedTilePosition.tile.x, this.selectedTilePosition.tile.y);
            if (tile.value) {
                this.findSameNumberTileContainers(tile.value).forEach(function(container) {
                    container.addClass('same-number');
                });
            } else {
                this.findHighlightedTileContainers(this.selectedTilePosition).forEach(function(container) {
                    container.addClass('highlighted');
                });
            }
        }
    };

    BoardView.prototype.cleanBoard = function() {
        var view = this;
        view.properties.grid.eachSquared(function(xs, ys, squared) {
            squared.eachTile(function(xt, yt) {
                var container = view.findTileContainer(xs, ys, xt, yt);
                container.removeClass('selected');
                container.removeClass('highlighted');
                container.removeClass('same-number');
            });
        });
    };

    BoardView.prototype.destroy = function() {
        this.cleanBoard();
    };

    return BoardView;
});