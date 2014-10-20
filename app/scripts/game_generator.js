define('GameGenerator', [], function() {
    'use strict';

    function GameGenerator() {}
    GameGenerator.generate = function() {
        //Represent the board as three ways array
        return {
            origin: [
                [
                    [
                        [5, 3, null],
                        [6, null, null],
                        [null, 9, 8]
                    ],
                    [
                        [null, 7, null],
                        [1, 9, 5],
                        [null, null, null]
                    ],
                    [
                        [null, null, null],
                        [null, null, null],
                        [null, 6, null]
                    ]
                ],
                [
                    [
                        [8, null, null],
                        [4, null, null],
                        [7, null, null]
                    ],
                    [
                        [null, 6, null],
                        [8, null, 3],
                        [null, 2, null]
                    ],
                    [
                        [null, null, 3],
                        [null, null, 1],
                        [null, null, 6]
                    ]
                ],
                [
                    [
                        [null, 6, null],
                        [null, null, null],
                        [null, null, null]
                    ],
                    [
                        [null, null, null],
                        [4, 1, 9],
                        [null, 8, null]
                    ],
                    [
                        [2, 8, null],
                        [null, null, 5],
                        [null, 7, 9]
                    ]
                ]
            ],
            solved: [
                [
                    [
                        [5, 3, 4],
                        [6, 7, 2],
                        [1, 9, 8]
                    ],
                    [
                        [6, 7, 8],
                        [1, 9, 5],
                        [3, 4, 2]
                    ],
                    [
                        [9, 1, 2],
                        [3, 4, 8],
                        [5, 6, 7]
                    ]
                ],
                [
                    [
                        [8, 5, 9],
                        [4, 2, 6],
                        [7, 1, 3]
                    ],
                    [
                        [7, 6, 1],
                        [8, 5, 3],
                        [9, 2, 4]
                    ],
                    [
                        [4, 2, 3],
                        [7, 9, 1],
                        [8, 5, 6]
                    ]
                ],
                [
                    [
                        [9, 6, 1],
                        [2, 8, 7],
                        [3, 4, 5]
                    ],
                    [
                        [5, 3, 7],
                        [4, 1, 9],
                        [2, 8, 6]
                    ],
                    [
                        [2, 8, 4],
                        [6, 3, 5],
                        [1, 7, 9]
                    ]
                ]
            ]
        };
    };

    return GameGenerator;
});