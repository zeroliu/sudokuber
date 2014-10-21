define(['renderer', 'controllers/grid_ctrl'], function(Renderer, GridCtrl) {
    'use strict';

    function GameManager() {
        this.renderer = new Renderer();
        this.renderer.addCtrl(new GridCtrl());
        this.renderer.draw();
    }
    return GameManager;
});