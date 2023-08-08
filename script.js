/*property
    activePlayer, add, addEventListener, alert, classList, getElementById, id,
    innerHTML, length, log, nextElementSibling, playerOneCharacter,
    playerTwoCharacter, querySelectorAll, reload, remove, state, tagName,
    target
*/
/*global
    GLOBAL, characterMap, checkForWinner, console,
    document, getPositionOfCell, initialise, location,
    markWinningCombo, play, pushCharacterIntoPosition,
    window, winningCombinations
*/

const GLOBAL = {
    state: "inactive", //default state
    activePlayer: "x", //'x' always starts first
    playerOneCharacter: "x",
    playerTwoCharacter: "o"
};

var characterMap = [
    "0", "1", "2",
    "3", "4", "5",
    "6", "7", "8"
];

// Adds class "win" to cells that are part of the winnning combination
function markWinningCombo(position1, position2, position3) {
    var tableCells = document.querySelectorAll("#game-board td");
    var i;

    for (i = 0; i < tableCells.length; i += 1) {
        tableCells[position1].classList.add("win");
        tableCells[position2].classList.add("win");
        tableCells[position3].classList.add("win");
    }
}

// Checks if a winning combination has been achieved
function checkWinningCombo(number) {
    var winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    var i;

    for (i = 0; i < winningCombinations[number].length; i += 1) {
        if (
            (
                characterMap[winningCombinations[number][i]] ===
                characterMap[winningCombinations[number][i + 1]]
            ) &&
            (
                characterMap[winningCombinations[number][i]] ===
                characterMap[winningCombinations[number][i + 2]]
            )
        ) {
            markWinningCombo(
                winningCombinations[number][i],
                winningCombinations[number][i + 1],
                winningCombinations[number][i + 2]
            );
            return true;
        } else {
            return false
        }
    }
}

// Checks if a player has won
function checkForWinner() {
    var i;

    for (i = 0; i < characterMap.length - 1; i += 1) {
        if (checkWinningCombo(i)) {
            GLOBAL.state = "complete";
        }
    }

}

/**
* Pushes players move into the right position
* in the characterMap array
*/
function pushCharacterIntoPosition(character, position) {
    characterMap[position] = character;
    console.log(characterMap);
    checkForWinner();
}

// Returns position of the cell which was clicked
function getPositionOfCell(target) {
    var position = target.id;
    return (position - 1);
}

/**
 * Adds appropriate character (x or o) to cell and
 * Changes the active player
*/
function play(target) {
    var cellPosition;

    if (
        target.tagName === "TD" &&
        target.innerHTML === ""
    ) {

        cellPosition = getPositionOfCell(target);

        if (GLOBAL.activePlayer === GLOBAL.playerOneCharacter) {
            target.innerHTML = GLOBAL.playerOneCharacter;
            pushCharacterIntoPosition(GLOBAL.playerOneCharacter, cellPosition);

            //Changes active player
            GLOBAL.activePlayer = GLOBAL.playerTwoCharacter;

        } else if (GLOBAL.activePlayer === GLOBAL.playerTwoCharacter) {
            target.innerHTML = GLOBAL.playerTwoCharacter;
            pushCharacterIntoPosition(GLOBAL.playerTwoCharacter, cellPosition);

            //Changes active player
            GLOBAL.activePlayer = GLOBAL.playerOneCharacter;

        } else { /*Do nothing*/ }
    }
}

// Initialises onload
function initialise() {
    var table = document.getElementById("game-board");
    var restartButton = document.getElementById("restart-button");

    if (table && restartButton && GLOBAL.state !== "complete") {
        //Triggers player to press START button to begin
        table.addEventListener("click", function (event) {
            var targetElement = event.target;

            if (GLOBAL.state === "inactive") {
                GLOBAL.state = "active";
            }

            if (GLOBAL.state === "active" && restartButton) {
                restartButton.classList.remove("hide");
                play(targetElement);
            }
        });

        //restart game
        restartButton.addEventListener("click", function () {
            location.reload();
        });
    }
}

// @ts-ignore
document.addEventListener("load", initialise());