describe("Board", function() {
    var board, Board;

    beforeEach(function() {
        Board = window.minesweeper.Board
    });

    describe("creating a board", function () {

        it("should return a board object when it is called with new", () => {
            var board = Board()
            expect(board instanceof Board).toBeTruthy()
        })

        it("should return a board object when called as a function", () => {
            var board = new Board()
            expect(board instanceof Board).toBeTruthy()
        })
    })

    describe("board setup", function () {
        beforeEach(function() {
            board = new Board()
        });
        it("sets up height and width and mines of the board", function () {
            expect(board.width).toEqual(30)
            expect(board.height).toEqual(15)
            expect(board.mines).toEqual(20)
        })

        it("it creates an array for the board", function () {
            expect(board.spots.length).toEqual(board.height * board.width)
        })

        it("it places mines in the board", function () {
            expect(
                _.filter(board.spots, function (value) {return value.mine}).length
            ).toEqual(board.mines)
        })

        it("it places mines randomly", function () {
            board1 = board
            board2 = new Board()
            expect(_.isEqual(board.spots, board1.spots)).toBeTruthy()
            expect(_.isEqual(board.spots, board2.spots)).toBeFalsy()
        })
    })

    describe("board behavior", function () {
        beforeEach(function() {
            board = new Board()
        });

        it("clears a spot", function() {
            expect(board.spots[0].cleared).toBeFalsy()
            board.clearSpot(0)
            expect(board.spots[0].cleared).toBeTruthy()
        })

        it("determines if a point is in the first column", function () {
            expect(board.firstColumn(0)).toBeTruthy()
            expect(board.firstColumn(12)).toBeFalsy()
            expect(board.firstColumn(29)).toBeFalsy()
            expect(board.firstColumn(180)).toBeTruthy()
            expect(board.firstColumn(223)).toBeFalsy()
            expect(board.firstColumn(239)).toBeFalsy()
            expect(board.firstColumn(420)).toBeTruthy()
            expect(board.firstColumn(433)).toBeFalsy()
            expect(board.firstColumn(449)).toBeFalsy()

            expect(board.firstColumn(30)).toBeTruthy()
            expect(board.firstColumn(59)).toBeFalsy()
            expect(board.firstColumn(421)).toBeFalsy()
            expect(board.firstColumn(390)).toBeTruthy()
        })

        it("determines if a point is in the first row", function () {
            expect(board.firstRow(0)).toBeTruthy()
            expect(board.firstRow(12)).toBeTruthy()
            expect(board.firstRow(29)).toBeTruthy()
            expect(board.firstRow(180)).toBeFalsy()
            expect(board.firstRow(223)).toBeFalsy()
            expect(board.firstRow(239)).toBeFalsy()
            expect(board.firstRow(420)).toBeFalsy()
            expect(board.firstRow(433)).toBeFalsy()
            expect(board.firstRow(449)).toBeFalsy()

            expect(board.firstRow(30)).toBeFalsy()
            expect(board.firstRow(59)).toBeFalsy()
            expect(board.firstRow(1)).toBeTruthy()
            expect(board.firstRow(28)).toBeTruthy()
        })

        it("determines if a point is in the last column", function () {
            expect(board.lastColumn(0)).toBeFalsy()
            expect(board.lastColumn(12)).toBeFalsy()
            expect(board.lastColumn(29)).toBeTruthy()
            expect(board.lastColumn(180)).toBeFalsy()
            expect(board.lastColumn(223)).toBeFalsy()
            expect(board.lastColumn(239)).toBeTruthy()
            expect(board.lastColumn(420)).toBeFalsy()
            expect(board.lastColumn(433)).toBeFalsy()
            expect(board.lastColumn(449)).toBeTruthy()

            expect(board.lastColumn(28)).toBeFalsy()
            expect(board.lastColumn(59)).toBeTruthy()
            expect(board.lastColumn(448)).toBeFalsy()
            expect(board.lastColumn(419)).toBeTruthy()
        })

        it("determines if a point is in the last row", function () {
            expect(board.lastRow(0)).toBeFalsy()
            expect(board.lastRow(12)).toBeFalsy()
            expect(board.lastRow(29)).toBeFalsy()
            expect(board.lastRow(180)).toBeFalsy()
            expect(board.lastRow(223)).toBeFalsy()
            expect(board.lastRow(239)).toBeFalsy()
            expect(board.lastRow(420)).toBeTruthy()
            expect(board.lastRow(433)).toBeTruthy()
            expect(board.lastRow(449)).toBeTruthy()

            expect(board.lastRow(390)).toBeFalsy()
            expect(board.lastRow(421)).toBeTruthy()
            expect(board.lastRow(419)).toBeFalsy()
            expect(board.lastRow(448)).toBeTruthy()
        })

        it("finds neighbors for top left corner", function () {
            var neighbors = board.neighbors(0)
            var expected = [1, 30, 31]
        })

        it("finds neighbors for top right corner", function () {
            var neighbors = board.neighbors(29)
            var expected = [28, 58, 59]
        })

        it("finds neighbors for bottom left corner", function () {
            var neighbors = board.neighbors(420)
            var expected = [390, 391, 421]
        })

        it("finds neighbors for bottom right corner", function () {
            var neighbors = board.neighbors(449)
            var expected = [418, 419, 448]
        })

        it("finds neighbors for mid left", function () {
            var neighbors = board.neighbors(180)
            var expected = [150, 151, 181, 210, 211]
        })

        it("finds neighbors for mid right", function () {
            var neighbors = board.neighbors(239)
            var expected = [208,209, 238, 268, 269]
        })

        it("finds neighbors for mid bottom", function () {
            var neighbors = board.neighbors(433)
            var expected = [402, 403, 404, 432, 434]
        })

        it("finds neighbors for mid top", function () {
            var neighbors = board.neighbors(12)
            var expected = [11, 13, 41, 42, 43]
        })

        it("finds neighbors for center block", function () {
            var neighbors = board.neighbors(223)
            var expected = [192, 193, 194, 222, 224, 252, 253, 254]
        })
    })
});
