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

    Board.prototype.clearSpot = function clearSpot (i) {
        if (!this.spots[i].cleared) {
            this.spots[i].cleared = true
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
        var count = 0

        // if this is previously calculated return it
        if (this.spots[i].mineCount) {
            return this.spots[i].mineCount
        }

        // count mines in neighbor tiles
        for (var i = 0; i < neighbors.length; i++) {
            if (this.spots[neighbors[i]].mine) {
                count++
            }
        }

        this.spots[i].mineCount = count
        return this.spots[i].mineCount
    }
})();
