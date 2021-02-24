const buttons = document.querySelector('.buttons');
const allButtons = document.querySelectorAll('.button')
const scoreBoard = document.querySelector('.score');
const goButton = document.querySelector('#go')
const resetButton = document.querySelector('#reset')
const lossScreen = document.querySelector('#loss')
const newButton = document.querySelector('#new')
const signal = document.querySelector('.turn')
const audio = [];
let scores = 0
let computerPattern = [];
let playerPattern = [];
let roundSpeed = 1075
let computer = true;
let counter = 0


// Found from https://codepen.io/fitri/pen/NjbMRV
audio[0] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
audio[1] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
audio[2] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
audio[3] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
//makes it so that each audio file does not override itsself.
function music(audio) {
	if (audio.paused) {
		audio.play();
	} else {
		audio.currentTime = 0;
	}
}
// computer picks a number (1-4) adds it to the computerPattern array
function computerPicks(){
    const num = Math.floor(Math.random() * 4 )
    computerPattern.push(num)
}
// play turn for computer
// function to select elements and play the array argument
function computerTurn (arr) {
    turns()
    computerPicks()
    let i = 0;
    const sequence = setInterval( ()=>{
        if (i >= arr.length ) {
            clearInterval(sequence)
            
        }else{
        allButtons[arr[i]].classList.add('fade')
		music(audio[arr[i]])
        setTimeout(function(){
           allButtons.forEach(button => {
            button.classList.remove('fade')
           })
        }, 500)
    }
        if(i != arr.length ){
            i++
        } else{
            i=0
            turns()
        }
    }, roundSpeed)
    
}


function newRound(){
    playerPattern = []
    roundSpeed -= 80
    computerTurn(computerPattern)
     counter = 0
}


function turns(){
    if(computer){
        computer = false;
        buttons.classList.add('no-touchy')
        signal.innerText = 'Please Wait'
        signal.style.backgroundColor = 'rgba(216, 18, 8, 0.79)'
    } else {
        computer = true;
        buttons.classList.remove('no-touchy')
        signal.innerText = 'Your Turn'
        signal.style.backgroundColor = 'rgba(0,212,255,1)'
    }
   
}
function checkPattern(arr1, arr2){
        for (let i = 0; i < arr1.length; i++) {
            if(arr1[i] !== parseInt(arr2[i])){
               return false
            }            
        }
        return true
}

function reset() {
    computerPattern = []
    playerPattern = []
    scores = 0
    counter = 0
    allButtons.forEach(button => {
        button.classList.remove('fade')
       })
    scoreBoard.innerHTML = 'Score:' + scores
    signal.innerText = 'Press Start!'
}

function loss() {
    lossScreen.style.display = 'block'
    document.querySelector('.background').style.filter = 'blur(4px)'
}
function newGame() {
    lossScreen.style.display = 'none'
    document.querySelector('.background').style.filter = 'none'
    reset()
}

function handleButtonClick(event){
    if(event.target.classList.contains('button')){
       	event.preventDefault();
        const button = event.target
        button.classList.add('fade')
		music(audio[button.dataset.number])
        setTimeout(function(){
            button.classList.remove('fade')
        }, 500)
        // players input updates array
		playerPattern.push(button.dataset.number)
        if (playerPattern.length == computerPattern.length) {
            if(checkPattern(computerPattern,playerPattern)){
                scores++
                scoreBoard.innerHTML = 'Score:' + scores
                newRound()
            }else {
                loss()
            }
        }
    }
    // give score condition
    // restart turn
}
buttons.addEventListener('click', handleButtonClick)
goButton.addEventListener('click', newRound)
resetButton.addEventListener('click', reset)
newButton.addEventListener('click', newGame)
