//Grid controller controls the grids on the board
define(['controllers/ctrl_base', 'views/tile_view', 'views/board_view', 'views/button_view', 'views/state_button_view', 'models/grid', 'game_generator', 'keyboard_input', 'jquery'],
    function(CtrlBase, TileView, BoardView, ButtonView, StateButtonView, Grid, GameGenerator, KeyboardInput, $) {
        'use strict';

        function GridCtrl() {
            CtrlBase.call(this);
            var ctrl = this;
            ctrl.keyboardInput = new KeyboardInput();
            ctrl.keyboardInput.registerEvent(ctrl, ctrl.onKeyDown, 'keyDown');
            ctrl.gridContainer = $('.grid-container');
            ctrl.numberContainer = $('.number-container');
            ctrl.setup();
        }

        GridCtrl.prototype = Object.create(CtrlBase.prototype);

        GridCtrl.prototype.checkWin = function() {
            var isWin = true;
            var ctrl = this;
            ctrl.model.grid.eachSquared(function(xs, ys, squared) {
                squared.eachTile(function(xt, yt, tile) {
                    if (tile.value !== ctrl.model.solvedGrid[ys][xs][yt][xt]) {
                        isWin = false;
                    }
                });
            });
            if (isWin) {
                // alert('You win!');
            }
        };

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
                element: ctrl.gridContainer,
                properties: {
                    grid: ctrl.model.grid
                }
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
            ctrl.views.draftButtonView = new StateButtonView({
                element: $('.btn-draft'),
                properties: {
                    iconOn: 'flaticon-draft1',
                    iconOff: 'flaticon-edit41'
                }
            });
            ctrl.views.draftButtonView.registerEvent(ctrl, ctrl.onDraftButtonClicked, 'click');
            ctrl.addView(ctrl.views.draftButtonView);
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
            if (this.model.inDraftMode) {
                this.updateSelectedTileDraft(properties.index + 1);
            } else {
                this.updateSelectedTileValue(properties.index + 1);
            }
        };

        GridCtrl.prototype.onEraseButtonClicked = function() {
            if (this.model.inDraftMode) {
                this.clearSelectedTileDraft();
            } else {
                this.updateSelectedTileValue(null);
            }

        };

        GridCtrl.prototype.onDraftButtonClicked = function(properties) {
            this.model.inDraftMode = properties.state;
        };

        GridCtrl.prototype.onKeyDown = function(data) {
            if (data >= 1 && data <= 9) {
                this.updateSelectedTileValue(data);
            } else {
                this.trick();
            }
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
            this.model.selectedTile.updateValue(value);
            this.findTileViewByTile(this.model.selectedTile).redraw();
            this.views.boardView.redraw();
            this.checkWin();
        };

        GridCtrl.prototype.updateSelectedTileDraft = function(value) {
            if (!this.model.selectedTile) {
                return;
            }
            if (this.model.selectedTile.isFixed) {
                return;
            }
            this.model.selectedTile.updateDraft(value);
            this.findTileViewByTile(this.model.selectedTile).redraw();
        };

        GridCtrl.prototype.clearSelectedTileDraft = function() {
            if (!this.model.selectedTile) {
                return;
            }
            if (this.model.selectedTile.isFixed) {
                return;
            }
            this.model.selectedTile.clearDraft();
            this.findTileViewByTile(this.model.selectedTile).redraw();
        };

        GridCtrl.prototype.findTileViewByTile = function(tile) {
            return this.views.tileViews[this.generateTileViewKey(tile)];
        };

        // debug
        GridCtrl.prototype.trick = function() {
            var ctrl = this;
            ctrl.model.grid.eachSquared(function(xs, ys, squared) {
                squared.eachTile(function(xt, yt, tile) {
                    tile.updateValue(ctrl.model.solvedGrid[ys][xs][yt][xt]);
                    ctrl.views.tileViews[ctrl.generateTileViewKey(tile)].redraw();
                });
            });
        };

        return GridCtrl;
    });