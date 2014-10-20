require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery'
    },
    shim: {}
});

require(['game_manager'], function(GameManager) {
    'use strict';
    new GameManager();
});