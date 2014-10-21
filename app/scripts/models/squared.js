define(['models/tile'], function(Tile) {
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
        for (y = 0; y < this.size; y++) {
            row = [];
            for (x = 0; x < this.size; x++) {
                row.push(new Tile({
                    position: {
                        x: x,
                        y: y
                    },
                    isFixed: undefined,
                    value: undefined,
                    draft: []
                }));
            }
            tiles.push(row);
        }

        return tiles;
    };

    Squared.prototype.fromState = function(state) {
        var tiles = [];
        var x, y, row, tileState;
        for (y = 0; y < this.size; y++) {
            row = [];
            for (x = 0; x < this.size; x++) {
                tileState = state[y][x];
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

    Squared.prototype.initWithOriginValues = function(originValues) {
        var x, y, originValue;
        for (y = 0; y < this.size; y++) {
            for (x = 0; x < this.size; x++) {
                this.tiles[y][x] = null;
                originValue = originValues[y][x];
                this.tiles[y][x] = new Tile({
                    position: {
                        x: x,
                        y: y
                    },
                    value: originValue,
                    isFixed: originValue !== null
                });

            }
        }
    };

    Squared.prototype.eachTile = function(callback) {
        var x, y;
        for (y = 0; y < this.size; y++) {
            for (x = 0; x < this.size; x++) {
                callback(x, y, this.tiles[y][x]);
            }
        }
    };
    return Squared;
});