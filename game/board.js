;(function () {
    "use strict"
    if (!window.minesweeper) {
        window.minesweeper = {}
    }

    var Board = window.minesweeper.Board = function Board () {
        if(!(this instanceof Board)) {
            return new Board()
        }
        this.width = 30
        this.height = 15
        this.mines = 20
    }

    console.log(Board)

})();
