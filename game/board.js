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

        // create an array for the board
        this.generateBoard()

        // add mines to the board
        this.addMines()
    }

    Board.prototype.generateBoard = function generateBoard () {
        this.spots = []
        for (var i = 0; i < this.height * this.width; i++) {
            this.spots.push({cleared: false, mine:false})
        }
    }

    Board.prototype.addMines = function addMines () {
        var mineLocations = []
        while (mineLocations.length < this.mines) {
            var randomLocation = _.random(this.spots.length - 1)
            if (mineLocations.indexOf(randomLocation) === -1) {
                mineLocations.push(randomLocation)
            }
        }

        // add the mines to the board
        for (var i = 0; i < mineLocations.length; i++) {
            this.spots[mineLocations[i]].mine = true
        }
    }
})();
