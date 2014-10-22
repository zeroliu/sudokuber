define(['renderer', 'controllers/game_ctrl'], function(Renderer, GameCtrl) {
    'use strict';

    function SystemManager() {
        this.renderer = new Renderer();
        this.renderer.addCtrl(new GameCtrl());
        this.renderer.draw();
    }
    return SystemManager;
});