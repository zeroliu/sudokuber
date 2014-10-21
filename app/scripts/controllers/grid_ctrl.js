//Grid controller controls the grids on the board
define(['controllers/ctrl_base', 'views/tile_view', 'views/board_view', 'views/button_view', 'models/grid', 'jquery'],
    function(CtrlBase, TileView, BoardView, ButtonView, Grid, $) {
        'use strict';

        function GridCtrl(rawData) {
            CtrlBase.call(this);

            this.gridContainer = $('.grid-container');
            this.numberContainer = $('.number-container');
            this.model = {};
            this.setupGrid(rawData.origin);
            this.model.solvedGrid = rawData.solved;
            this.setupViews();
        }

        GridCtrl.prototype = Object.create(CtrlBase.prototype);

        GridCtrl.prototype.setupViews = function() {
            var ctrl = this;
            //setup tile views
            ctrl.tileViews = {};
            ctrl.model.grid.eachSquared(function(xs, ys, squared) {
                var squaredContainer = ctrl.findSquaredContainer(xs, ys);
                squared.eachTile(function(xt, yt, tile) {
                    var tileContainer = ctrl.findTileContainer(xt, yt, squaredContainer);
                    var tileView = new TileView({
                        parent: tileContainer
                    });
                    tileView.configWithTile(tile);
                    ctrl.addView(tileView);
                    tileView.registerEvent(ctrl, ctrl.onTileClicked, 'click');
                    ctrl.tileViews[ctrl.generateTileViewKey(tile)] = tileView;
                });
            });

            ctrl.boardView = new BoardView({
                element: ctrl.gridContainer
            });
            ctrl.addView(ctrl.boardView);

            var buttons = ctrl.numberContainer.find('button');
            for (var index = 0; index < buttons.length; index++) {
                var buttonView = new ButtonView({
                    element: $(buttons[index]),
                    properties: {
                        index: index + 1
                    }
                });
                buttonView.registerEvent(ctrl, ctrl.onNumberButtonClicked, 'click');
                ctrl.addView(buttonView);
            }
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

        GridCtrl.prototype.generateTileViewKey = function(tile) {
            return '' + tile.parent.x + tile.parent.y + tile.x + tile.y;
        };

        GridCtrl.prototype.onTileClicked = function(properties) {
            this.model.selectedTile = properties.tile;
            this.boardView.updateSelectedTile(properties.tile);
        };

        GridCtrl.prototype.onNumberButtonClicked = function(properties) {
            if (this.model.selectedTile.isFixed) {
                return;
            }
            this.model.selectedTile.value = properties.index;
            this.tileViews[this.generateTileViewKey(this.model.selectedTile)].redraw();
        };

        return GridCtrl;
    });