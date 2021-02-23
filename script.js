const buttons = document.querySelector('.buttons');
const allButtons = document.querySelectorAll('.button')
const scoreBoard = document.querySelector('.score');
const goButton = document.querySelector('#go')
const resetButton = document.querySelector('#reset')
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
           allButtons[arr[i]].classList.remove('fade')
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
// computerTurn([0,1,2,0])

function newRound(){
    playerPattern = []
    roundSpeed -= 100
    computerTurn(computerPattern)
    console.log(computerPattern, playerPattern)
     counter = 0

}


function turns(){
    if(computer){
        computer = false;
        buttons.classList.add('no-touchy')
        console.log('no touchy!')
    } else {
        computer = true;
        buttons.classList.remove('no-touchy')
        console.log('you can touch!')
    }
   
}
function checkPattern(arr1, arr2){
    console.log(arr1, arr2)
    if (arr1.length != arr2.length) {
        return false
    } else {
        for (let i = 0; i < arr1.length; i++) {
            if(arr1[i] !== parseInt(arr2[i])){
                console.log(parseInt(arr2[i]))
                return false
            // }else {
            //     return true
            }
            
        }
        return true
    }
}
function score(){
    if(counter == computerPattern.length){
        if (checkPattern(computerPattern, playerPattern)) {
            scores++
            console.log('correct!')
            scoreBoard.innerHTML = 'Score:' + scores
            turns()
            newRound()
        }else{
        console.log('Oh no')
        }
    }
}

function reset() {
    computerPattern = []
    playerPattern = []
    scores = 0
    scoreBoard.innerHTML = 'Score:' + scores
}

function handleButtonClick(event){
    console.log('clicked!')
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
        counter++
        console.log(counter)
    }
    // give score condition
    // restart turn
    if (counter == computerPattern.length){
        turns()
        score()
    }
}
buttons.addEventListener('click', handleButtonClick)
goButton.addEventListener('click', newRound)
resetButton.addEventListener('click', reset)
