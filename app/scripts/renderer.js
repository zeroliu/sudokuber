define(['jquery'], function($) {
    'use strict';

    function Renderer() {
        this.gridContainer = $('.tile-container');
    }

    Renderer.prototype.draw = function(grid) {
        var renderer = this;
        window.requestAnimationFrame(function() {
            renderer.gridContainer.empty();
            grid.eachSquared(function(x, y, squared) {
                console.log(x + ', ' + y);
                console.log(squared);
            });
        });
    };

    return Renderer;
});