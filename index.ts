const board = document.querySelector('.game-container') as HTMLElement;
const button = document.querySelector('.button-x') as HTMLElement;
const winMessage = document.querySelector('.winner') as HTMLElement;

type Move = "X" | "O" | "" ;

let move: Move = "X"

function listenBoard():void {
    board.addEventListener('click', runGame);
}

function main(): void {
    createBoard()
    listenBoard();
}

function runGame(e: Event): void {
    const boxId: string | null = (<HTMLElement>e.target).id;
    console.log(boxId);
    if (boxId == null) return;
    const boxApproved: HTMLElement | null = document.querySelector(`#${boxId}`);
    if (boxApproved == null || boxApproved.textContent !== "") return;
    boxApproved.textContent = move;
    changeBoxColor(boxApproved);
    const winner: boolean = isWinner();
    if(!winner) switchPlayer();
        else {
            endGame();
        }
}

function changeBoxColor(boxApproved: HTMLElement): void {
    if (move === "X") boxApproved.classList.replace("box", "x-class")
    else boxApproved.classList.replace("box", "o-class")
}

function endGame():void {
    board.removeEventListener('click', runGame);
    button.addEventListener('click', resetGame);
    if (winMessage === null) return;
    winMessage.textContent = `Winner is ${move}`;
    winMessage.setAttribute("display", "block");
    button.style.visibility = "visible";
   
}



function resetGame(): void {
    move = 'X'
    resetBoxes();
    button.style.visibility = 'hidden';
    winMessage.textContent = "";
    board.addEventListener('click', runGame)
}

function resetBoxes(): void {
    for (let i = 0; i <= 8; i++) {
        const box = document.querySelector(`#box-${i}`) as HTMLElement;
        box.textContent = "";
    
    const boxClass: string = box.className;
    box.classList.remove(boxClass)
    box.classList.add('box')
    }
}

function isWinner(): boolean {
    const boxes: Array<string> = getBoxes();

    return (
        (boxes[0] == boxes[1] && boxes[1] == boxes[2] && boxes[0] !== "") ||
        (boxes[3] == boxes[4] && boxes[4] == boxes[5] && boxes[3] !== "") ||
        (boxes[6] == boxes[7] && boxes[7] == boxes[8] && boxes[6] !== "") ||
        (boxes[0] == boxes[4] && boxes[4] == boxes[8] && boxes[0] !== "") ||
        (boxes[2] == boxes[4] && boxes[4] == boxes[6] && boxes[2] !== "") ||
        (boxes[1] == boxes[4] && boxes[4] == boxes[7] && boxes[1] !== "") ||
        (boxes[0] == boxes[3] && boxes[3] == boxes[6] && boxes[0] !== "") ||
        (boxes[2] == boxes[5] && boxes[5] == boxes[8] && boxes[2] !== "") 

    );
}

function getBoxes(): Array<string> {
    const boxesContent: Array<string> = [];
    for (let i = 0; i <= 8; i++) {
        const box = document.querySelector(`#box-${i}`) as HTMLElement;
        const boxContent: string | null = box.textContent
        if(boxContent == null) boxesContent.push("");
        else {
            boxesContent.push(boxContent);
        }
    }
    return boxesContent;
}

function switchPlayer(): void {
    if (move === "X") {
        move = "O"
    } else {
        move = "X"
    }
}

function createBoard(): void {
    for(let i = 0; i <= 8; i++) makeBox(i)
}

function makeBox(i: number): void {
    const box: HTMLDivElement = document.createElement('div');
    box.className = 'box';
    box.id = `box-${i}`
    box.textContent = "";
    board.append(box);
}


main()