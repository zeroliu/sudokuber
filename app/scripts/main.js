require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery'
    },
    shim: {}
});

require(['GameManager'], function(GameManager) {
    'use strict';
    window.requestAnimationFrame(function() {
        new GameManager();
    });
});