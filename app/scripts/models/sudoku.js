define(['models/grid', 'game_generator'], function(Grid, GameGenerator) {
    'use strict';

    function Sudoku() {
        this.setup();
    }

    Sudoku.prototype.setup = function() {
        this.inDraftMode = false;
        this.setupGrid();
    };

    Sudoku.prototype.setupGrid = function() {
        var rawData = GameGenerator.generate();
        this.grid = new Grid({
            size: 3
        });
        this.solvedGrid = rawData.solved;
        this.grid.initWithOriginValues(rawData.origin);
    };

    Sudoku.prototype.canWin = function() {
        var canWin = true;
        var ctrl = this;
        ctrl.grid.eachSquared(function(xs, ys, squared) {
            squared.eachTile(function(xt, yt, tile) {
                if (tile.value !== ctrl.solvedGrid[ys][xs][yt][xt]) {
                    canWin = false;
                }
            });
        });
        return canWin;
    };

    Sudoku.prototype.isSelectedTileAvailable = function() {
        return this.selectedTile && !this.selectedTile.isFixed;
    };

    Sudoku.prototype.insertValue = function(value) {
        if (this.inDraftMode) {
            return this.updateSelectedTileDraft(value);
        }
        return this.updateSelectedTileValue(value);
    };

    Sudoku.prototype.clearValue = function() {
        var hasClearDraftSucceeded = this.clearSelectedTileDraft();
        var hasClearTileSucceeded = this.updateSelectedTileValue(null);
        return hasClearTileSucceeded || hasClearDraftSucceeded;
    };

    /*
     * @return whether the update is successful
     */
    Sudoku.prototype.updateSelectedTileDraft = function(value) {
        if (!this.isSelectedTileAvailable()) {
            return false;
        }
        if (this.selectedTile.value) {
            return false;
        }
        this.selectedTile.updateDraft(value);
        return true;
    };

    Sudoku.prototype.clearSelectedTileDraft = function(value) {
        if (!this.isSelectedTileAvailable()) {
            return false;
        }
        this.selectedTile.clearDraft(value);
        return true;
    };

    Sudoku.prototype.updateSelectedTileValue = function(value) {
        if (!this.isSelectedTileAvailable()) {
            return false;
        }
        if (this.selectedTile.value === value) {
            return false;
        }
        this.selectedTile.updateValue(value);

        return true;
    };



    return Sudoku;
});