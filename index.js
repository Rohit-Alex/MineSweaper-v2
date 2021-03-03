const container = document.querySelector("container");
const grid = document.querySelector(".grid");
const flag = document.getElementById("flagsLeft");
const resultDisplay = document.getElementById("result");
const Score = document.getElementById("score");
let width = 10;
let noOfBombs = 10;     
const random = [];   // to store the bombs unique positions
const bombs = [];   // to copy the bombs position to display later
const suffledArray = [];  // actual array containing bombs and safe position. Bombs at that particular itself
const bombsSurrounded = []; //to store no of bombs at neighbourhood


var upperBound = width*width ;
while(random.length < noOfBombs) {
    var uniqueNo = Math.floor(Math.random()*upperBound);
    if(random.indexOf(uniqueNo) === -1)
        random.push(uniqueNo);
}

for(let i = 0; i<100; i++){
    if(i === 0){            //top left
        let count = 0;
        if(random.includes(1))
        count++;
        if(random.includes(10))
        count++;
        if(random.includes(11))
        count++;
        bombsSurrounded.push(count);
    }
    else if(i === 9){       //top right
        let count = 0;
        if(random.includes(8))
        count++;
        if(random.includes(18))
        count++;
        if(random.includes(19))
        count++;
        bombsSurrounded.push(count);
    }
    else if(i === 90){      //bottom left
        let count = 0;
        if(random.includes(80))
        count++;
        if(random.includes(81))
        count++;
        if(random.includes(91))
        count++;
        bombsSurrounded.push(count);
    }
    else if(i === 99){      //bottom right
        let count = 0;
        if(random.includes(88))
        count++;
        if(random.includes(98))
        count++;
        if(random.includes(89))
        count++;
        bombsSurrounded.push(count);
    }
    else if(i>0 && i<9) {       //first row
        let count = 0;
        if(random.includes(i-1))
        count++;
        if(random.includes(i+1))
        count++;
        if(random.includes(i+9))
        count++;
        if(random.includes(i+10))
        count++;
        if(random.includes(i+11))
        count++;
        bombsSurrounded.push(count);
    }
    else if(i%10 === 0) {           //first column
        let count = 0;
        if(random.includes(i-10))
        count++;
        if(random.includes(i-9))
        count++;
        if(random.includes(i+1))
        count++;
        if(random.includes(i+10))
        count++;
        if(random.includes(i+11))
        count++;
        bombsSurrounded.push(count);
    }
    else if(i%10 === 9) {       //last column
        let count = 0;
        if(random.includes(i-11))
        count++;
        if(random.includes(i-10))
        count++;
        if(random.includes(i-1))
        count++;
        if(random.includes(i+10))
        count++;
        if(random.includes(i+9))
        count++;
        bombsSurrounded.push(count);
    }
    else if(i>90 && i<99) {       //last row
        let count = 0;
        if(random.includes(i-11))
        count++;
        if(random.includes(i-10))
        count++;
        if(random.includes(i-9))
        count++;
        if(random.includes(i-1))
        count++;
        if(random.includes(i+1))
        count++;
        bombsSurrounded.push(count);
    }
    else {                      //amywhere within the boundary
        let count = 0;
        if(random.includes(i-11))
        count++;
        if(random.includes(i-10))
        count++;
        if(random.includes(i-9))
        count++;
        if(random.includes(i-1))
        count++;
        if(random.includes(i+1))
        count++;
        if(random.includes(i+9))
        count++;
        if(random.includes(i+10))
        count++;
        if(random.includes(i+11))
        count++;
        bombsSurrounded.push(count);
    }
}

console.log(random);

console.log(bombsSurrounded);

function createBoard() {
    for(let i=0;i<width*width;i++) {
        const square = document.createElement('div');
        square.setAttribute('id',i);
        if(random.indexOf(i) === -1){
            square.className = 'valid';
        }
        else{
            square.className = 'bomb';
            bombs.push(square);
        }
        square.setAttribute("data",bombsSurrounded[i]);
        flag.innerHTML = 10;
        grid.appendChild(square);
    }
}

createBoard();

var total = 1;
var flagValue = 9;
var score = 0;

function handler(e) {
    let targetElem =  document.getElementById(e.target.id);
    if(e.target.className === "valid"){
        e.target.className += " checked";
        targetElem.innerHTML = targetElem.getAttribute("data");
        score++;
        Score.innerHTML = score;
        if( score === 90) {
            resultDisplay.innerText = "YOU WIN";
            document.querySelector(".grid").removeEventListener('click',handler);
            document.querySelector(".grid").removeEventListener('contextmenu',handleRightClick);
        }
    }
    if(e.target.className === "bomb" && e.target.className !== "checked" ) {
        e.target.innerHTML = "💣";
        showReaminingBombs();
        resultDisplay.innerText = "YOU LOSE";       
        document.querySelector(".grid").removeEventListener('click',handler);
        document.querySelector(".grid").removeEventListener('contextmenu',handleRightClick);
    }
}

function showReaminingBombs() {
    for(let i=0; i<noOfBombs; i++){
        bombs[i].className = "bomb";
        bombs[i].innerHTML = "💣";
    }
}

function handleRightClick(e){
        if(flagValue >= 0 && e.target.className !== "valid flag") {
        flag.innerHTML = flagValue;
        e.target.className += ' flag';
        e.target.innerHTML = "!";
        e.preventDefault();
        if(flag)
        flagValue--;
        }

}

document.querySelector(".grid").addEventListener('click',handler);

document.querySelector(".grid").addEventListener('contextmenu',handleRightClick);


function reload() {
    location.reload();
}