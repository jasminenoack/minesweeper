;(function () {
    "use strict"
    var Board = window.minesweeper.Board
    var board, height, width, blockCount

    var $boardElement = $("#minesweeper")

    function setUpCell($div, spot, i) {
        if (spot.cleared) {
            $div.addClass("cleared")
            if (spot.mine) {
                $div.addClass("mine")
            } else {
                var mineCount = board.mineCount(i)
                $div.text(mineCount)
                if (mineCount < 1) {
                    $div.addClass("blue")
                } else if (mineCount < 2) {
                    $div.addClass("orange")
                } else {
                    $div.addClass("red")
                }
            }
        }
    }

    function renderBoard() {
        var spots = board.spots
        $boardElement.empty()
        for (var i = 0; i < spots.length; i++) {
            var $div = $('<div class="spot"></div>')
            var spot = spots[i]
            $div.data("index", i)
            setUpCell($div, spot, i)
            $boardElement.append($div)
        }
    }

    function startBoard() {
        board = new Board()
        height = board.height
        width = board.width
        blockCount = board.spots.length
        renderBoard()
    }

    function cascade (spot) {
        var blocksToProcess = board.neighbors(spot)
        while(blocksToProcess.length) {
            var index = blocksToProcess.shift()
            var spot = board.spots[index]
            var $div = $($(".spot")[index])
            if (!spot.cleared) {
                board.clearSpot(index)
                setUpCell($div, spot, index)
                if (!board.mineCount(index)) {
                    blocksToProcess = blocksToProcess.concat(board.neighbors(index))
                }
            }
        }
        if (board.won()) {
            $(".won").removeClass("hidden")
        }
    }

    $boardElement.click(".spot", function (event) {
        var $spot = $(event.target)
        var index = $spot.data("index")
        board.clearSpot(index)
        renderBoard()
        if (board.lost) {
            board.clearAll()
            renderBoard()
            $(".lost").removeClass("hidden")
        } else if (!board.mineCount(index)) {
            cascade(index)
        } else {
            if (board.won()) {
                $(".won").removeClass("hidden")
            }
        }
    })

    $("button").click(function () {
        startBoard();
        $(".lost").addClass("hidden")
        $(".won").addClass("hidden")
    })

    startBoard()
})();
