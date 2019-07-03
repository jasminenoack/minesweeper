import { Board } from "./board.js";

var board;

var boardElement = document.getElementById("minesweeper");
var wrapperElement = document.getElementById("wrapper");
var mineCountElement = document.getElementById("mine-count");

function setUpCell(div, spot, i) {
  if (div.length > 1) {
  }
  div.classList.remove("flagged");
  div.classList.remove("fas");
  div.classList.remove("fa-flag");
  if (spot.cleared) {
    div.classList.add("cleared");
    if (spot.mine) {
      div.classList.add("mine");
      if (spot.flagged) {
        div.classList.add("flagged");
        div.classList.add("fas");
        div.classList.add("fa-flag");
      } else {
        div.classList.add("fas");
        div.classList.add("fa-bomb");
      }
    } else if (spot.flagged) {
      div.classList.add("flagged");
      div.classList.add("fas");
      div.classList.add("fa-times-circle");
    } else {
      var mineCount = board.mineCount(i);
      if (mineCount) {
        div.innerText = mineCount;
      }
      if (mineCount < 2) {
        div.classList.add("blue");
      } else if (mineCount < 3) {
        div.classList.add("green");
      } else {
        div.classList.add("orange");
      }
    }
  } else if (spot.flagged) {
    div.classList.add("flagged");
    div.classList.add("fas");
    div.classList.add("fa-flag");
  }
  mineCountElement.innerText = board.mines - board.countFlags();
}

function renderBoard() {
  var spots = board.spots;
  boardElement.innerHTML = "";
  for (var i = 0; i < spots.length; i++) {
    let div = document.createElement("div");
    div.className = "spot";
    var spot = spots[i];
    div.dataset.index = i;
    setUpCell(div, spot, i);
    boardElement.append(div);
  }
}

function startBoard() {
  const diffSelect = document.getElementById("difficulty");
  const selection = diffSelect.children[diffSelect.selectedIndex];
  const height = +selection.dataset.height;
  const width = +selection.dataset.width;
  const mines = +selection.dataset.mines;
  board = new Board(width, height, mines);
  wrapperElement.style.width = width * 30 + "px";
  renderBoard();
}

function cascade(spot) {
  var blocksToProcess = board.neighbors(spot);
  while (blocksToProcess.length) {
    var index = blocksToProcess.shift();
    var spot = board.spots[index];
    var newSpot = document.getElementsByClassName("spot")[index];
    if (!spot.cleared) {
      board.clearSpot(index);
      setUpCell(newSpot, spot, index);
      if (!board.mineCount(index)) {
        blocksToProcess = blocksToProcess.concat(board.neighbors(index));
      }
    }
  }
  if (board.won()) {
    document.getElementById("won").classList.remove("hidden");
  }
}

boardElement.addEventListener("click", event => {
  const target = event.target;
  if (target.classList.contains("spot")) {
    var index = +target.dataset.index;
    board.clearSpot(index);
    setUpCell(target, board.spots[index], index);
    if (board.spots[index].flagged) {
      return;
    }
    if (board.lost) {
      board.clearAll();
      renderBoard();
      document.getElementById("lost").classList.remove("hidden");
    } else if (!board.mineCount(index)) {
      cascade(index);
    } else {
      if (board.won()) {
        document.getElementById("won").classList.remove("hidden");
      }
    }
  }
});

boardElement.addEventListener("contextmenu", event => {
  event.preventDefault();
  const target = event.target;
  if (target.classList.contains("spot")) {
    const index = +target.dataset.index;
    const spot = board.spots[index];
    if (board.spots[index].cleared) {
      const neighbors = board.neighbors(index);
      let countFlags = 0;
      neighbors.forEach(neighbor => {
        if (board.spots[neighbor].flagged) {
          countFlags++;
        }
      });
      if (countFlags === spot.mineCount) {
        cascade(index);
      }
    } else {
      board.flagSpot(index);
    }
    setUpCell(target, board.spots[index], index);
  }
});

let buttons = document.getElementsByTagName("button");
Array.prototype.slice.call(buttons).forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("won").classList.add("hidden");
    document.getElementById("lost").classList.add("hidden");
    startBoard();
  });
});

startBoard();
