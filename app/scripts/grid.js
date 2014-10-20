define('Grid', ['Squared'], function(Squared) {
    'use strict';
    // config:
    // - state: a two-dim list represents the state of the squared
    // - size: size of the grid
    function Grid(config) {
        this.size = 3; //hardcoded for this prototype
        this.squareds = config.state ? this.fromState(config.state) : this.empty();
    }

    Grid.prototype.empty = function() {
        var squareds = [];
        var x, y, row;
        for (x = 0; x < this.size; x++) {
            row = [];
            for (y = 0; y < this.size; y++) {
                row.push(null);
            }
            squareds.push(row);
        }

        return squareds;
    };

    Grid.prototype.fromState = function(state) {
        var squareds = [];
        var x, y, row, squaredState;
        for (x = 0; x < this.size; x++) {
            row = [];
            for (y = 0; y < this.size; y++) {
                squaredState = state[x][y];
                row.push(squaredState ? new Squared({
                    position: {
                        x: x,
                        y: y
                    },
                    state: squaredState
                }) : null);
            }
            squareds.push(row);
        }
        return squareds;
    };

    Grid.prototype.eachSquared = function(callback) {
        var x, y;
        for (x = 0; x < this.size; x++) {
            for (y = 0; y < this.size; y++) {
                callback(x, y, this.cells[x][y]);
            }
        }
    };
    return Grid;
});