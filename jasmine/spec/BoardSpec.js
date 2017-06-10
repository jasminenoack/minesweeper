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
        xit("sets up height and width of the board", function () {

        })

        xit("it creates an array for the board", function () {

        })

        xit("it places mines in the board", function () {

        })

        xit("it places mines randomly", function () {

        })
    })
});
