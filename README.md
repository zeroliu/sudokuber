Game hosted on http://code.xiyuanliu.com/sudokuber

## About code:
- structure:  
```
app/ (main project)
    scripts/
        controllers/
            ctrl_base.js (base class of controllers)
            game_ctrl.js (main game controller that handles the views and sudoku model)
        models/
            grid.js (data model for grid which contains a list of squareds)
            squared.js (data model for squared which contains a list of tiles)
            tile.js (data model for tiles)
            sudoku.js (main game logic)
        views/
            view_base.js (base class of views)
            board_view.js (view object representing the board, used for highlighting)
            button_view.js (view object for buttons)
            state_button_view.js (view object for buttons that have states. ex: draft button)
            tile_view.js (view object for tiles, it will create tile elements on the fly)
        animframe_polyfill.js (http://creativejs.com/resources/requestanimationframe/)
        game_generators.js (board generator. for this version, it only generates a hardcoded board)
        system_manager.js (core system where renderer and game controller get created)
        keyboard_input.js (listen to the keyboard input)
        main.js (bridge between html and js)
        renderer.js (loop through all the views in the controllers and redraw the dirty elements in every draw call)
    styles/
        fonts/ (icons downloaded from http://www.flaticon.com/)
        animations.scss (style file for animations)
        helpers.scss (style file for mixin helpers)
        main.scss (main style file)
    index.html
test/ (unit testing files, not being used in this version)
bower.json
Gruntfile.js
package.json
README.md
.bowerrc
.gitignore
.jshintrc
```

- technologies used:
  * Yeoman  
    Yeoman was used for initial project setup. It gave me a nice configured grunt to start with.
  * Grunt
    - grunt-watch  
    It allows to live reload the page, run jshint and compass when there is any changes on files.
    - grunt-connect  
    Create a local server without configuring apache
    - grunt-jshint  
    Check javascript syntax automatically
    - grunt-compass  
    Compile scss files to css on the fly
    - grunt-*min  
    All the *min modules are used for minify files when making production build
  * requireJS  
    With requireJS, it is easier to create modules and separate code logic. It allows me to add new js files without touching index.html. It handles the dependency nicely.
  * Amazon dc2  
    I have my own dc2 server setup to host the game. I used my deploy script to deploy the app to the server in a single click.
  * jQuery  
    Simplify DOM manipulation
  * SCSS  
    Allow using mixin and variables in css

- custom SVC system:  
    In order to keep a clean structure without using any existing framework, I created my own SVC system. I implemented the controllers in such a way that it is added to the renderer and have renderer to redraw its dirty views in every draw call. The controllers handles the communication between its views and models, but should not have any game logic implementation. Views can either create html elements on the fly or becomes a wrapper of the existing html elements. For the first case, it will need a parent to define where to append the new created elements. View also handles events. For example, a button view will handle the click event of its inner html element. With this feature, the controller can register these events and handle click event without knowing the DOM details. Models handles the data logic. In our case, you can find most of the game logic in Sudoku model.

## About changes if having more time:
- improve performance  
    Some of the redraw methods are not fast enough. For example the board view, in order to redraw all the highlights, it needs to go through all 81 cells twice in the current version. I can probably create a cache to save all the previous highlighted elements instead of loop through everything.
- try two-dimension arrays instead of four-dimension  
    In my program, I represented the board with a 4-dimension array. (2-dimension squareds, 2-dimension tiles). I designed it in such a way because it could be directly reflected to the view and I could have got more control in squared level without parsing the index of the tiles. It ended up being very difficult to manipulate a 4-dimension array. If I had more time, I would have tried 2-dimension array with 9 cells in each dimension.
- writing tests  
    Writing unit and functional tests with Mocha framework which has been already set up in the project.
- board generator  
    Writing a board generator instead of hardcoding the board.


## About testing:
Desktop version tested with Chrome V38, Safari V8, Firefox V33, IE 10.  
Mobile version tested with HTC One, iPhone 4, iPhone 5, iPhone 6plus, iPad  

## About Git commits:
All the tags in the git commits can be reflected to a task in this asana board.  
Asana task link: https://app.asana.com/-/share?s=18188662894864-tPF2xpUl75XW9UMAgwF9KdDE7IYTezgOVMtQyn3jmuO-384344853680
