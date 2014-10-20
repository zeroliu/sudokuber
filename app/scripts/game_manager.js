define(['game_generator', 'grid'], function(GameGenerator, Grid) {
    'use strict';

    function GameManager() {
        this.setup();
    }

    GameManager.prototype.setup = function() {
        var rawData = GameGenerator.generate();

        this.setupGrid(rawData.origin);
        this.solvedValues = rawData.solved;
    };

    GameManager.prototype.setupGrid = function(rawValues) {
        this.size = 3;
        this.grid = new Grid({
            size: this.size
        });
        this.grid.initWithOriginValues(rawValues);
        console.log(this.grid);
    };

    return GameManager;
});