const buttons = document.querySelector('.buttons');
const allButtons = document.querySelectorAll('.button')
const score = document.querySelector('.score');
const computerPattern = [];
const playerPattern = [];
const audio = [];

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

function computerTurn (arr) {
    buttons.removeEventListener('click', handleButtonClick)
    computerPicks()
    let i = 0
     const sequence = setInterval( ()=>{
        allButtons[arr[i]].classList.add('fade')
		music(audio[arr[i]])
        setTimeout(function(){
           allButtons[arr[i]].classList.remove('fade')
        }, 500)
        if(i = arr.length ){
            clearInterval(sequence)
            console.log(i)
            i = 0
        } else {
            i++
            console.log(i)
        }
    }, 1000)
 
}

computerTurn([0,1,2,3,0])


function handleButtonClick(event){
    if(event.target.classList.contains('button')){
       		event.preventDefault();
        const button = event.target
        button.classList.add('fade')
		music(audio[button.dataset.number])
        setTimeout(function(){
            button.classList.remove('fade')
        }, 500)
		playerPattern.push(button.dataset.number)
        console.log(button.dataset.number)
    }
}
buttons.addEventListener('click', handleButtonClick)


// play turn for computer
// function to select elements and play array as argument
// make players turn
    // players turn must reset playerPattern
// players input updates array
// compare arrays as json objects 
// give score condition
// restart turn