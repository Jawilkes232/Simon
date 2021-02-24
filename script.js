const buttons = document.querySelector('.buttons');
const allButtons = document.querySelectorAll('.button')
const scoreBoard = document.querySelector('.score');
const goButton = document.querySelector('#go')
const resetButton = document.querySelector('#reset')
const lossScreen = document.querySelector('#loss')
const newButton = document.querySelector('#new')
const signal = document.querySelector('.turn')
const extreme = document.querySelector('#extreme')
const game = document.querySelector('#game')
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

// Starts a new round and resets players input
function newRound(){
    playerPattern = []
    roundSpeed -= 80
    computerTurn(computerPattern)
     counter = 0
}

//toggleable turn sequence to disable user input and signal who's turn it is.
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
//Helper function to check the elements up to the current item in the players array
//this creates a more life-like Simon game feel as you press one wrong key and game ends
function checkPattern(arr1, arr2){
        for (let i = 0; i < arr2.length; i++) {
            if(arr1[i] !== parseInt(arr2[i])){
               return false
            }            
        }
        return true
}
//Hard resets the game and ensure player can push buttons.
function reset() {
    computerPattern = []
    playerPattern = []
    scores = 0
    counter = 0
    roundSpeed = 1075
    allButtons.forEach(button => {
        button.classList.remove('fade')
       })
    scoreBoard.innerHTML = 'Score:' + scores
    signal.innerText = 'Press Start!'
    buttons.style.overflow = 'hidden'
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(`extreme-${i + 1}`)
    }
    game.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
}
//pushes lose modal 
function loss() {
    lossScreen.style.display = 'block'
    document.querySelector('.background').style.filter = 'blur(4px)'
}
//removes modal and resets game
function newGame() {
    lossScreen.style.display = 'none'
    document.querySelector('.background').style.filter = 'none'
    reset()
}
function extremeMode() {
    buttons.style.overflow = 'visible'
    game.style.backgroundColor = 'transparent'
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.add(`extreme-${i + 1}`)
        
    }
}
//click handler 
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
        //checks every input for correct answer
        if(checkPattern(computerPattern,playerPattern)){
            if (playerPattern.length == computerPattern.length) {
                    scores++
                    scoreBoard.innerHTML = 'Score:' + scores
                    newRound()
                }
        }else {
            loss()
        }
    }
}
//adds event listeners.
buttons.addEventListener('click', handleButtonClick)
goButton.addEventListener('click', newRound)
resetButton.addEventListener('click', reset)
newButton.addEventListener('click', newGame)
extreme.addEventListener('click', extremeMode)
