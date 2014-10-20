define('Squared', ['Tile'], function(Tile) {
    'use strict';

    // config: 
    // - position:
    //  - x: 0-2
    //  - y: 0-2
    // - state: a two-dim list represents the state of the tiles
    //          ex: [[{value: 1, isFixed: true}, null, {draft: [1,2,4]}],
    //               [null, null, null],
    //               [null, null, {value: 2}]]
    function Squared(config) {
        this.size = 3;
        this.x = config.position.x;
        this.y = config.position.y;
        this.tiles = config.state ? this.fromState(config.state) : this.empty();
    }

    Squared.prototype.empty = function() {
        var tiles = [];
        var x, y, row;
        for (x = 0; x < this.size; x++) {
            row = [];
            for (y = 0; y < this.size; y++) {
                row.push(null);
            }
            tiles.push(row);
        }

        return tiles;
    };

    Squared.prototype.fromState = function(state) {
        var tiles = [];
        var x, y, row, tileState;
        for (x = 0; x < this.size; x++) {
            row = [];
            for (y = 0; y < this.size; y++) {
                tileState = state[x][y];
                row.push(tileState ? new Tile({
                    position: {
                        x: x,
                        y: y
                    },
                    value: tileState.value,
                    draft: tileState.draft,
                    isFixed: tileState.isFixed
                }) : null);
            }
            tiles.push(row);
        }
        return tiles;
    };

    return Squared;
});