/*
Tile represents the number tiles in each squared
*/
define([], function() {
    'use strict';

    // config: 
    // - position:
    //  - x: 0-2
    //  - y: 0-2
    // - value: 1-9 or undefined
    // - draft: list of guessed number (ex: [1, 3, 4]) or undefined
    // - isFixed: a boolean represents whether the number is generated by the board
    function Tile(config) {
        this.x = config.position.x;
        this.y = config.position.y;
        this.value = config.value;
        this.draft = config.draft;
        this.isFixed = (config.isFixed === undefined) ? false : config.isFixed;
    }

    Tile.prototype.updateValue = function(value) {
        this.value = value;
    };

    return Tile;
});