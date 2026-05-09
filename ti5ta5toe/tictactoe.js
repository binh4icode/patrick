var board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' ',
};

var combinations = [[1, 2, 3], [1, 4, 7], [1, 5, 9], [2, 5, 8], [3, 6, 9], [3, 5, 7], [4, 5, 6], [7, 8, 9]]

let playercount = false;
let player = "X";
var turn = 0;
let yourTurn = true;

function onePlayer() {
    playercount = false;
    reset()
    yourTurn = true;
}
function twoPlayer() {
    playercount = true;
    reset()
}
function getAiMove() {
    let randomNumber = Math.ceil(Math.random() * 9);
    while (board[randomNumber] !== " ") {
        randomNumber = Math.ceil(Math.random() * 9);
    }
    return randomNumber;
}

function displayAiMove() {
    console.log("Ai active")
    let moveNumber = getAiMove()

    document.getElementById("b" + moveNumber).value = "O";
    document.getElementById("b" + moveNumber).disabled = true;

    board[moveNumber] = "O";
    turn++;
    document.getElementById("68").innerHTML = "It is turn: " + turn;

    if (checkWin("O")) {
        document.getElementById("ins").textContent = "The Ai won";
        disableButton()
    }
    else if (tie()) {
        document.getElementById("ins").textContent = "Its a tie";
    }
    yourTurn = true
}

function mark(position) {
    if (playercount == false) {
        if (yourTurn == true) {

            yourTurn = false
            console.log(position)

            document.getElementById("b" + position).value = player;
            document.getElementById("b" + position).disabled = true;

            board[position] = player;
            turn++;
            document.getElementById("68").innerHTML = "It is turn: " + turn;

            if (checkWin(player)) {
                document.getElementById("ins").textContent = "The winner is Player " + player;
                disableButton()
            }
            else if (tie()) {
                document.getElementById("ins").textContent = "Its a tie";
            }


            if (!checkWin(player) && !tie()) {
                setTimeout(displayAiMove, 1000)
                // displayAiMove()
            }
        }
    }
    if (playercount == true) {
        document.getElementById("b" + position).value = player;
        document.getElementById("b" + position).disabled = true;

        board[position] = player;
        turn++;
        document.getElementById("68").innerHTML = "It is turn: " + turn;

        if (checkWin(player)) {
            document.getElementById("ins").textContent = "The winner is Player " + player;
            disableButton()
        }
        else if (tie()) {
            document.getElementById("ins").textContent = "Its a tie";
        }
        if (player == "X") {
            player = "O"
        } else {
            player = "X"
        }
    }
}




function checkWin(player) {
    for (var i = 0; i < combinations.length; i++) {
        var count = 0;
        for (var j = 0; j < combinations[i].length; j++) {
            if (board[combinations[i][j]] === player) {
                count++;
            }
            if (count === 3) {
                return true;
            }
        }
    }
    return false;
}

function tie() {
    // ✅   removed turn++.
    if (turn === 9) {
        return true
    } else {
        return false
    }
}

function reset() {
    yourTurn = true

    board = {
        1: ' ',
        2: ' ',
        3: ' ',
        4: ' ',
        5: ' ',
        6: ' ',
        7: ' ',
        8: ' ',
        9: ' ',
    }

    turn = 0
    document.getElementById("68").innerHTML = "It is turn: 0";
    for (let i = 1; i < 10; i++) {
        document.getElementById("b" + i).value = ""
        document.getElementById("b" + i).disabled = false
        document.getElementById("68").innerHTML = "It is turn: 0";
        document.getElementById("ins").textContent = "Enjoy playing this classic game! There is a single player mode available, and a two player mode. You can be X or O."


    }

    player = "X"


}

function disableButton() {
    for (let i = 1; i < 10; i++) {
        document.getElementById("b" + i).disabled = true
    }
}


