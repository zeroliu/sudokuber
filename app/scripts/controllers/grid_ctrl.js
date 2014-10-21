//Grid controller controls the grids on the board
define(['controllers/ctrl_base', 'views/tile_view', 'views/board_view', 'views/button_view', 'models/grid', 'game_generator', 'jquery'],
    function(CtrlBase, TileView, BoardView, ButtonView, Grid, GameGenerator, $) {
        'use strict';

        function GridCtrl() {
            CtrlBase.call(this);
            this.gridContainer = $('.grid-container');
            this.numberContainer = $('.number-container');
            this.setup();
        }

        GridCtrl.prototype = Object.create(CtrlBase.prototype);

        GridCtrl.prototype.setup = function() {
            this.setupModel();
            this.setupViews();
        };

        GridCtrl.prototype.setupModel = function() {
            var ctrl = this;
            ctrl.model = {
                win: false,
                inDraftMode: false
            };
            ctrl.setupGrid();
        };

        GridCtrl.prototype.setupGrid = function() {
            this.size = 3;
            var rawData = GameGenerator.generate();
            this.model.grid = new Grid({
                size: this.size
            });
            this.model.solvedGrid = rawData.solved;
            this.model.grid.initWithOriginValues(rawData.origin);
        };

        GridCtrl.prototype.setupViews = function() {
            var ctrl = this;
            ctrl.views = {};
            //setup tile views
            ctrl.views.tileViews = {};
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
                    ctrl.views.tileViews[ctrl.generateTileViewKey(tile)] = tileView;
                });
            });

            ctrl.views.boardView = new BoardView({
                element: ctrl.gridContainer
            });
            ctrl.addView(ctrl.views.boardView);

            var buttons = ctrl.numberContainer.find('button');
            var index;
            for (index = 0; index < buttons.length; index++) {
                var buttonView = new ButtonView({
                    element: $(buttons[index]),
                    properties: {
                        index: index
                    }
                });
                buttonView.registerEvent(ctrl, ctrl.onNumberButtonClicked, 'click');
                ctrl.addView(buttonView);
            }
            ctrl.views.eraseButtonView = new ButtonView({
                element: $('.btn-erase')
            });
            ctrl.views.eraseButtonView.registerEvent(ctrl, ctrl.onEraseButtonClicked, 'click');
            ctrl.addView(ctrl.views.eraseButtonView);
            ctrl.views.retryButtonView = new ButtonView({
                element: $('.btn-retry')
            });
            ctrl.views.retryButtonView.registerEvent(ctrl, ctrl.onRetryButtonClicked, 'click');
            ctrl.addView(ctrl.views.retryButtonView);
        };

        // Event handlers
        GridCtrl.prototype.onRetryButtonClicked = function() {
            this.removeAllViews();
            this.setup();
        };

        GridCtrl.prototype.onTileClicked = function(properties) {
            this.model.selectedTile = properties.tile;
            this.views.boardView.updateSelectedTile(properties.tile);
        };

        GridCtrl.prototype.onNumberButtonClicked = function(properties) {
            this.updateSelectedTileValue(properties.index + 1);
        };

        GridCtrl.prototype.onEraseButtonClicked = function() {
            this.updateSelectedTileValue(null);
        };

        // Helper methods
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

        GridCtrl.prototype.generateTileViewKey = function(tile) {
            return '' + tile.parent.x + tile.parent.y + tile.x + tile.y;
        };

        GridCtrl.prototype.updateSelectedTileValue = function(value) {
            if (!this.model.selectedTile) {
                return;
            }
            if (this.model.selectedTile.isFixed) {
                return;
            }
            this.model.selectedTile.value = value;
            this.views.tileViews[this.generateTileViewKey(this.model.selectedTile)].redraw();
        };

        return GridCtrl;
    });