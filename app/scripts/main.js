require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery'
    },
    shim: {}
});

require(['system_manager'], function(SystemManager) {
    'use strict';
    // Wait till the browser is ready to render the game (avoids glitches)
    window.requestAnimationFrame(function() {
        new SystemManager();
    });
});