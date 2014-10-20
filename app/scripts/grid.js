define(['squared'], function(Squared) {
    'use strict';
    // config:
    // - state: a two-dim list of Squared represents the state of the squared
    // - size: size of the grid
    function Grid(config) {
        this.size = 3; //hardcoded for this prototype
        this.squareds = config.state ? this.fromState(config.state) : this.empty();
    }

    Grid.prototype.empty = function() {
        var squareds = [];
        var x, y, row;
        for (y = 0; y < this.size; y++) {
            row = [];
            for (x = 0; x < this.size; x++) {
                row.push(new Squared({
                    position: {
                        x: x,
                        y: y
                    }
                }));
            }
            squareds.push(row);
        }

        return squareds;
    };

    Grid.prototype.fromState = function(state) {
        var squareds = [];
        var x, y, row, squaredState;
        for (y = 0; y < this.size; y++) {
            row = [];
            for (x = 0; x < this.size; x++) {
                squaredState = state[y][x];
                row.push(new Squared({
                    position: {
                        x: x,
                        y: y
                    },
                    state: squaredState
                }));
            }
            squareds.push(row);
        }
        return squareds;
    };

    Grid.prototype.initWithOriginValues = function(originValues) {
        this.eachSquared(function(x, y, squard) {
            squard.initWithOriginValues(originValues[x][y]);
        });
    };

    Grid.prototype.eachSquared = function(callback) {
        var x, y;
        for (y = 0; y < this.size; y++) {
            for (x = 0; x < this.size; x++) {
                callback(x, y, this.squareds[y][x]);
            }
        }
    };
    return Grid;
});