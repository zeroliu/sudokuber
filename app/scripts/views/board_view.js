define(['views/view_base', 'jquery'], function(ViewBase, $) {
    'use strict';

    function BoardView() {
        ViewBase.call(this);
        this.oldSelectedTilePosition = undefined;
        this.selectedTilePosition = undefined;
    }

    BoardView.prototype = Object.create(ViewBase.prototype);

    BoardView.prototype.updateSelectedTile = function(tile) {
        this.oldSelectedTilePosition = this.selectedTilePosition;
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
    BoardView.prototype.findTileContainer = function(tilePosition) {
        var squaredContainer = $('.grid-container').find(
            '.grid-row:eq(' + tilePosition.squared.y + ') ' +
            '.grid-cell:eq(' + tilePosition.squared.x + ') ' +
            '.squared-container');
        return squaredContainer.find(
            '.squared-row:eq(' + tilePosition.tile.y + ') ' +
            '.squared-cell:eq(' + tilePosition.tile.x + ')');
    };

    BoardView.prototype.draw = function() {
        var view = this;
        ViewBase.prototype.draw.call(this);
        console.log('draw board');
        if (this.oldSelectedTilePosition) {
            view.findTileContainer(this.oldSelectedTilePosition).removeClass('selected');
        }
        if (this.selectedTilePosition) {
            view.findTileContainer(this.selectedTilePosition).addClass('selected');
        }
    };
    return BoardView;

});