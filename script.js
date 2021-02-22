const buttons = document.querySelector('.buttons');
const allButtons = document.querySelectorAll('.button')
const score = document.querySelector('.score');
const computerPattern = [];
const playerPattern = [];
const audio = [];
let roundSpeed = 1000
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
    roundSpeed -= 75
    computerTurn(computerPattern)
    let counter = 0
    if(counter == computerPattern.length){
        checkPattern()
        if (checkPattern(computerPattern, playerPattern)) {
            turns()
        }else{
            //lose 
        }
    }

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
    if (arr1.length != arr2.length) {
        return false
    } else {
        for (let i = 0; i < arr1.length; i++) {
            if(arr1[i] != arr2[i]){
                return false
            }else {
                return true
            }
            
        }
    }
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
}
buttons.addEventListener('click', handleButtonClick)




// make players turn
    // players turn must reset playerPattern


// give score condition
// restart turn