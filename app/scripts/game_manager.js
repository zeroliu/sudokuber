define(['game_generator', 'renderer', 'controllers/grid_ctrl'], function(GameGenerator, Renderer, GridCtrl) {
    'use strict';

    function GameManager() {
        this.renderer = new Renderer();
        var rawData = GameGenerator.generate();
        this.renderer.addCtrl(new GridCtrl(rawData));
        this.renderer.draw();
    }

    GameManager.prototype.setup = function() {};
    return GameManager;
});