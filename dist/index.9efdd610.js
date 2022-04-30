const board = document.querySelector('.game-container');
const button = document.querySelector('.button-x');
const winMessage = document.querySelector('.winner');
let move = "X";
function listenBoard() {
    board.addEventListener('click', runGame);
}
function main() {
    createBoard();
    listenBoard();
}
function runGame(e) {
    const boxId = e.target.id;
    console.log(boxId);
    if (boxId == null) return;
    const boxApproved = document.querySelector(`#${boxId}`);
    if (boxApproved == null || boxApproved.textContent !== "") return;
    boxApproved.textContent = move;
    changeBoxColor(boxApproved);
    const winner = isWinner();
    if (!winner) switchPlayer();
    else endGame();
}
function changeBoxColor(boxApproved) {
    if (move === "X") boxApproved.classList.replace("box", "x-class");
    else boxApproved.classList.replace("box", "o-class");
}
function endGame() {
    board.removeEventListener('click', runGame);
    button.addEventListener('click', resetGame);
    if (winMessage === null) return;
    winMessage.textContent = `Winner is ${move}`;
    winMessage.setAttribute("display", "block");
    button.style.visibility = "visible";
}
function resetGame() {
    move = 'X';
    resetBoxes();
    button.style.visibility = 'hidden';
    winMessage.textContent = "";
    board.addEventListener('click', runGame);
}
function resetBoxes() {
    for(let i = 0; i <= 8; i++){
        const box = document.querySelector(`#box-${i}`);
        box.textContent = "";
        const boxClass = box.className;
        box.classList.remove(boxClass);
        box.classList.add('box');
    }
}
function isWinner() {
    const boxes = getBoxes();
    return boxes[0] == boxes[1] && boxes[1] == boxes[2] && boxes[0] !== "" || boxes[3] == boxes[4] && boxes[4] == boxes[5] && boxes[3] !== "" || boxes[6] == boxes[7] && boxes[7] == boxes[8] && boxes[6] !== "" || boxes[0] == boxes[4] && boxes[4] == boxes[8] && boxes[0] !== "" || boxes[2] == boxes[4] && boxes[4] == boxes[6] && boxes[2] !== "" || boxes[1] == boxes[4] && boxes[4] == boxes[7] && boxes[1] !== "" || boxes[0] == boxes[3] && boxes[3] == boxes[6] && boxes[0] !== "" || boxes[2] == boxes[5] && boxes[5] == boxes[8] && boxes[2] !== "";
}
function getBoxes() {
    const boxesContent = [];
    for(let i = 0; i <= 8; i++){
        const box = document.querySelector(`#box-${i}`);
        const boxContent = box.textContent;
        if (boxContent == null) boxesContent.push("");
        else boxesContent.push(boxContent);
    }
    return boxesContent;
}
function switchPlayer() {
    if (move === "X") move = "O";
    else move = "X";
}
function createBoard() {
    for(let i = 0; i <= 8; i++)makeBox(i);
}
function makeBox(i) {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box-${i}`;
    box.textContent = "";
    board.append(box);
}
main();

//# sourceMappingURL=index.9efdd610.js.map
