let player = "x";
let currentPlayer = document.getElementById('nowPlaying');
let zone = document.getElementById('zone');
let box = document.getElementsByClassName('box');
let stat = {
    'x': 0,
    'o': 0,
    'd': 0
}
let winPosition = //Всевозможные выйгрышные комбинации 
    [[1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]];
for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('click', boxClick, false);
}
function boxClick() {
    let data = [];
    if (!this.innerHTML) {
        this.innerHTML = player;
    }
    for (let i in box) {
        if (box[i].innerHTML == player) {
            data.push(Number(box[i].getAttribute('pos')));
        }
    }
    if (checkWin(data)) {
        restart("Выграл: " + player + "!");
    }
    else {
        let draw = true;
        for (let i in box) {
            if (box[i].innerHTML == '') draw = false;
        }
        if (draw) {
            restart("Ничья");
        }
    }
    player = player == "x" ? "o" : "x";
    currentPlayer.innerHTML = player.toUpperCase();
}

function checkWin(data) {
    for (let i in winPosition) {
        let win = true;
        for (let j in winPosition[i]) {
            let id = winPosition[i][j];
            let ind = data.indexOf(id);
            if (ind == -1) {
                win = false
            }
        }
        if (win) {
            return true;
        }
    }
    return false;
}

function restart(text) {
    alert(text);
    location.reload()
}
