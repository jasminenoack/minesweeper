;(function () {
    "use strict"
    if (!window.minesweeper) {
        window.minesweeper = {}
    }

    var Board = window.minesweeper.Board = function Board (width, height, mines) {
        if(!(this instanceof Board)) {
            return new Board()
        }
        this.width = width || 30
        this.height = height || 15
        this.mines = mines || 20
        this.lost = false

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

    Board.prototype.clearSpot = function clearSpot (i) {
        if (!this.spots[i].cleared) {
            this.spots[i].cleared = true
            if (this.spots[i].mine) {
                this.lost = true
            }
        }
    }

    Board.prototype.firstColumn = function firstColumn (i) {
        return i % this.width == 0
    }

    Board.prototype.firstRow = function firstColumn (i) {
        return i < this.width
    }

    Board.prototype.lastRow = function lastRow (i) {
        return i > this.width * this.height - (this.width + 1)
    }

    Board.prototype.lastColumn = function lastColumn (i) {
        return (i + 1) % this.width == 0
    }

    Board.prototype.neighbors = function neighbors (i) {
        var firstRow = this.firstRow(i)
        var lastRow = this.lastRow(i)
        var firstColumn = this.firstColumn(i)
        var lastColumn = this.lastColumn(i)

        // if neighbors are already determined return them.
        if (this.spots[i].neighbor_blocks) {
            return this.spots[i].neighbor_blocks
        }

        var neighbor_blocks = []
        if (!firstRow && !firstColumn) {
            neighbor_blocks.push(i - this.width - 1)
        }
        if (!firstRow) {
            neighbor_blocks.push(i - this.width)
        }
        if (!firstRow && !lastColumn) {
            neighbor_blocks.push(i - this.width + 1)
        }
        if (!firstColumn) {
            neighbor_blocks.push(i - 1)
        }
        if (!lastColumn) {
            neighbor_blocks.push(i + 1)
        }
        if (!lastRow && !firstColumn) {
            neighbor_blocks.push(i + this.width - 1)
        }
        if (!lastRow) {
            neighbor_blocks.push(i + this.width)
        }
        if (!lastRow && !lastColumn) {
            neighbor_blocks.push(i + this.width + 1)
        }
        this.spots[i].neighbor_blocks = neighbor_blocks
        return this.spots[i].neighbor_blocks
    }

    Board.prototype.mineCount = function mineCount (i) {
        var neighbors = this.neighbors(i)
        var number_mines = 0

        // if this is previously calculated return it
        // if (this.spots[i].mineCount) {
        //     return this.spots[i].mineCount
        // }

        // count mines in neighbor tiles
        for (var j = 0; j < neighbors.length; j++) {
            if (this.spots[neighbors[j]].mine) {
                number_mines++
            }
        }
        if (this.spots[i].mineCount && this.spots[i].mineCount != number_mines) {
            console.log(this.spots[i].mineCount, number_mines)
            console.log("WTF")
        }

        this.spots[i].mineCount = number_mines
        return this.spots[i].mineCount
    }

    Board.prototype.clearAll = function mineCount () {
        for (var i = 0; i < this.spots.length; i++) {
            this.spots[i].cleared = true
        }
    }

    Board.prototype.won = function won () {
        for (var i = 0; i < this.spots.length; i++) {
            if (this.spots[i].cleared == false && this.spots[i].mine == false) {
                return false
            }
        }
        return true
    }
})();
