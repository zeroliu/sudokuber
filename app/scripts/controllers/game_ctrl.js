define(['controllers/ctrl_base', 'models/sudoku', 'views/tile_view', 'views/board_view', 'views/button_view', 'views/state_button_view', 'keyboard_input', 'jquery'],
    function(CtrlBase, Soduku, TileView, BoardView, ButtonView, StateButtonView, KeyboardInput, $) {
        'use strict';

        function GameCtrl() {
            CtrlBase.call(this);
            var ctrl = this;
            ctrl.keyboardInput = new KeyboardInput();
            ctrl.keyboardInput.registerEvent(ctrl, ctrl.onKeyDown, 'keyDown');
            ctrl.gridContainer = $('.grid-container');
            ctrl.numberContainer = $('.number-container');
            ctrl.setup();
        }

        GameCtrl.prototype = Object.create(CtrlBase.prototype);

        GameCtrl.prototype.setup = function() {
            this.model = new Soduku();
            this.setupViews();
        };

        GameCtrl.prototype.setupViews = function() {
            var ctrl = this;
            ctrl.views = {};
            ctrl.setupGridView();
            ctrl.setupBoardView();
            ctrl.setupButtonViews();
        };

        GameCtrl.prototype.setupGridView = function() {
            var ctrl = this;
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
        };

        GameCtrl.prototype.setupBoardView = function() {
            var ctrl = this;
            ctrl.views.boardView = new BoardView({
                element: ctrl.gridContainer,
                properties: {
                    grid: ctrl.model.grid
                }
            });
            ctrl.addView(ctrl.views.boardView);
        };

        GameCtrl.prototype.setupButtonViews = function() {
            var ctrl = this;
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
        GameCtrl.prototype.onRetryButtonClicked = function() {
            $('.win-screen-container').css('display', 'none');
            this.removeAllViews();
            this.setup();
        };

        GameCtrl.prototype.onTileClicked = function(properties) {
            this.model.selectedTile = properties.tile;
            this.views.boardView.updateSelectedTile(properties.tile);
        };

        GameCtrl.prototype.onNumberButtonClicked = function(properties) {
            if (!this.model.insertValue(properties.index + 1)) {
                return;
            }
            this.findTileViewByTile(this.model.selectedTile).redraw();
            this.views.boardView.redraw();
            if (this.model.canWin()) {
                $('.win-screen-container').css('display', 'block');
            }
        };

        GameCtrl.prototype.onEraseButtonClicked = function() {
            if (!this.model.clearValue()) {
                return;
            }
            this.findTileViewByTile(this.model.selectedTile).redraw();
            this.views.boardView.redraw();
        };

        GameCtrl.prototype.onDraftButtonClicked = function(properties) {
            this.model.inDraftMode = properties.state;
        };

        GameCtrl.prototype.onKeyDown = function(data) {
            if (data >= 1 && data <= 9) {
                if (!this.model.insertValue(data)) {
                    return;
                }
                this.findTileViewByTile(this.model.selectedTile).redraw();
                this.views.boardView.redraw();
            } else if (data === 0) {
                this.trick();
            }
        };

        // Helper methods
        GameCtrl.prototype.findSquaredContainer = function(x, y) {
            return this.gridContainer.find(
                '.grid-row:eq(' + y + ') ' +
                '.grid-cell:eq(' + x + ') ' +
                '.squared-container');
        };

        GameCtrl.prototype.findTileContainer = function(x, y, squaredContainer) {
            return squaredContainer.find(
                '.squared-row:eq(' + y + ') ' +
                '.squared-cell:eq(' + x + ')');
        };

        GameCtrl.prototype.findTileViewByTile = function(tile) {
            return this.views.tileViews[this.generateTileViewKey(tile)];
        };

        GameCtrl.prototype.generateTileViewKey = function(tile) {
            return '' + tile.parent.x + tile.parent.y + tile.x + tile.y;
        };

        // debug
        GameCtrl.prototype.trick = function() {
            var ctrl = this;
            ctrl.model.grid.eachSquared(function(xs, ys, squared) {
                squared.eachTile(function(xt, yt, tile) {
                    tile.updateValue(ctrl.model.solvedGrid[ys][xs][yt][xt]);
                    ctrl.views.tileViews[ctrl.generateTileViewKey(tile)].redraw();
                });
            });
        };

        return GameCtrl;
    });