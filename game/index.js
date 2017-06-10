;(function () {
    "use strict"
    var Board = window.minesweeper.Board
    var board = new Board()
    var height = board.height
    var width = board.width
    var blockCount = board.spots.length

    var $boardElement = $("#minesweeper")

    function renderBoard(height, width, spots) {
        $boardElement.empty()

        for (var i = 0; i < spots.length; i++) {
            var $div = $('<div class="spot"></div>')
            var spot = spots[i]
            if (spot.cleared) {
                $div.addClass("cleared")
                if (spot.mine) {
                    $div.addClass("mine")
                }
            }
            $div.data("index", i)
            $boardElement.append($div)
        }

    }

    renderBoard(board.height, board.width, board.spots)

    $boardElement.click(".spot", function (event) {
        var $spot = $(event.target)
        var index = $spot.data("index")
        board.clearSpot(index)
    })
})();
