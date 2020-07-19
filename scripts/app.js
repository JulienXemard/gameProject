function init() {

  //--------------------- DOM elements ---------------------//
  // All tracks
  const introTrack = document.querySelector('#intro-track')
  const countDownSound = document.querySelector('#countDown-sound')
  const emperorLaugh = document.querySelector('#emperor-laugh')
  const emperorGood = document.querySelector('#emperor-good')
  //--------------------------------------------------------------
  const docBody = document.querySelector('body')
  const intro = document.querySelector('#intro')
  const orignalOption = document.querySelector('#original-btn')
  const sosOption = document.querySelector('#sos-btn')
  const gameTimer = document.querySelector('#timer-text')
  const optionButtons = document.querySelectorAll('.level')


  let score = document.querySelector('#score')
  let time = document.querySelector('#time')
  let lives = document.querySelector('#lives')
  
  //--------------------- Game Variables -------------------//
  let timerCount = 5

  //----------------------- Functions ----------------------//
  // inGame Sounds
  function playSound(e) {
    introTrack.play()
  }

  // gameStart timer
  function gameStartTimer(e) {
    intro.remove()

    if (e.currentTarget === orignalOption) {
      emperorLaugh.play()
    } else if (e.currentTarget === sosOption) {
      emperorGood.play()
    }

    gameTimer.innerHTML = timerCount
    const countDown = setInterval(() => {
      timerCount--
      gameTimer.innerHTML = timerCount
      if (timerCount <= 0) {
        clearInterval(countDown)
        gameTimer.remove()
        console.log('Game should start')
      }
    }, 1000)
    
  }
  
  // Event Listener
  docBody.addEventListener('click', playSound)
  orignalOption.addEventListener('click', gameStartTimer)
  sosOption.addEventListener('click', gameStartTimer)

}
window.addEventListener('DOMContentLoaded', init)