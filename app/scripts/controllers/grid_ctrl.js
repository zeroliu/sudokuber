//Grid controller controls the grids on the board
define(['controllers/ctrl_base', 'views/tile_view', 'views/board_view', 'models/grid', 'jquery'], function(CtrlBase, TileView, BoardView, Grid, $) {
    'use strict';

    function GridCtrl(rawData) {
        CtrlBase.call(this);
        this.gridContainer = $('.grid-container');
        this.model = {};
        this.setupGrid(rawData.origin);
        this.model.solvedGrid = rawData.solved;
        this.setupViews();
    }

    GridCtrl.prototype = Object.create(CtrlBase.prototype);

    GridCtrl.prototype.setupViews = function() {
        var ctrl = this;
        ctrl.model.grid.eachSquared(function(xs, ys, squared) {
            var squaredContainer = ctrl.findSquaredContainer(xs, ys);
            squared.eachTile(function(xt, yt, tile) {
                var tileContainer = ctrl.findTileContainer(xt, yt, squaredContainer);
                var tileView = new TileView(tileContainer);
                tileView.configWithTile(tile);
                ctrl.addView(tileView);
                tileView.registerEvent(ctrl, ctrl.selectTile, 'click');
            });
        });
        this.boardView = new BoardView();
        ctrl.addView(this.boardView);
    };

    GridCtrl.prototype.findSquaredContainer = function(x, y) {
        return this.gridContainer.find(
            '.grid-row:eq(' + y + ') ' +
            '.grid-cell:eq(' + x + ') ' +
            '.squared-container');
    };

    GridCtrl.prototype.findTileContainer = function(x, y, squaredContainer) {
        return squaredContainer.find(
            '.squared-row:eq(' + y + ') ' +
            '.squared-cell:eq(' + x + ')');
    };

    GridCtrl.prototype.setupGrid = function(rawValues) {
        this.size = 3;
        this.model.grid = new Grid({
            size: this.size
        });
        this.model.grid.initWithOriginValues(rawValues);
    };

    GridCtrl.prototype.selectTile = function(tile) {
        this.model.selectedTile = tile;
        this.boardView.updateSelectedTile(tile);
    };

    return GridCtrl;
});