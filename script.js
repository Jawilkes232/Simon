const buttons = document.querySelectorAll('.button')
const score = document.querySelector('.score')
const computerPattern = []
const playerPattern = []
const audio = []

// Found from https://codepen.io/fitri/pen/NjbMRV
audio[0] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
audio[1] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
audio[2] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
audio[3] = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');




for(let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click',(event) => {
        event.preventDefault()
        audio[i].play()
        console.log(buttons[i].dataset.number)
    })
}