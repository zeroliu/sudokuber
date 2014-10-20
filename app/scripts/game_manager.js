define(['game_generator', 'grid', 'renderer'], function(GameGenerator, Grid, Renderer) {
    'use strict';

    function GameManager() {
        this.renderer = new Renderer();

        this.setup();
        this.renderer.draw(this.grid);
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
    };

    return GameManager;
});