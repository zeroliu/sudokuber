define(['game_generator', 'grid', 'renderer'], function(GameGenerator, Grid, Renderer) {
    'use strict';

    function GameManager() {
        this.renderer = new Renderer();

        this.setup();
    }

    GameManager.prototype.setup = function() {
        var rawData = GameGenerator.generate();

        this.setupGrid(rawData.origin);
        this.solvedValues = rawData.solved;
        this.metadata = {};
        // this.metadata.selected = {
        //     selected: {
        //         squared: {
        //             x: 1,
        //             y: 2
        //         },
        //         tile: {
        //             x: 2,
        //             y: 1
        //         }
        //     }
        // };
        this.renderer.draw(this.grid, this.metadata);
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