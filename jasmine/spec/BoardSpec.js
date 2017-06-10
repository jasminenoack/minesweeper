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
    })
});
