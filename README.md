Game hosted on http://code.xiyuanliu.com/sudokuber

About code:
- structure:
    app/ (main project)
        scripts/
            controllers/
                ctrl_base.js (the base class of controllers)
                game_ctrl.js (the main game controller that handles the views and sudoku model)
            models/
            views/
            animframe_polyfill.js
            game_generators.js
            game_manager.js
            keyboard_input.js
            main.js
            renderer.js
        styles/
            fonts/ (icons downloaded from http://www.flaticon.com/)
            animations.scss (style file for animations)
            helpers.scss (style file for mixin helpers)
            main.scss (main style file)
        index.html
    bower.json
    Gruntfile.js
    package.json
    README.md
    .bowerrc
    .gitignore
    .jshintrc

- technologies used:
    yeoman
    grunt
        grunt modules
    requirejs
    jquery

- custom SVC system


About changes if having more time:
- writing tests
- improve performance
- try two dimension arrays instead of four dimensions
- board generator


About testing:
Desktop version tested with Chrome V38, Safari V8, Firefox V33, IE 10.
Mobile version tested with HTC One, iPhone 4, iPhone 5, iPhone 6plus.

About Git commits:
Asana task link: https://app.asana.com/-/share?s=18188662894864-tPF2xpUl75XW9UMAgwF9KdDE7IYTezgOVMtQyn3jmuO-384344853680