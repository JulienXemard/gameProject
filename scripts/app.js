function init() {

  // DOM elements
  // All tracks
  const introTrack = document.querySelector('#intro-track')
  const countDownSound = document.querySelector('#countDown-Sound')
  const emperorLaugh = document.querySelector('#emperor-laugh')
  const emperorYes = document.querySelector('#emperor-yes')
  //--------------------------------------------------------------
  const docBody = document.querySelector('body')
  const intro = document.querySelector('#intro')
  const orignalOption = document.querySelector('#original-btn')
  const sosOption = document.querySelector('#sos-btn')
  const gameTimer = document.querySelector('#timer-text')


  let score = document.querySelector('#score')
  let time = document.querySelector('#time')
  let lives = document.querySelector('#lives')
  
  // Game variables
  let timerCount = 5

  // Functions
  function playSoundIntro(e) {
    // introTrack.play()

  }

  function gameStartTimer(e) {
    console.log(e.target)
    console.log('clicked')
    intro.remove()
    emperorLaugh.play()


    const countDown = setInterval(() => {
      timerCount--
      gameTimer.innerHTML = timerCount
      if (timerCount <= 0) {
        clearInterval(countDown)
        console.log('Game should start')
      }
    }, 1000)


    
  }
  
  // Event Listener
  docBody.addEventListener('mouseenter', playSoundIntro)
  orignalOption.addEventListener('click', gameStartTimer)
  sosOption.addEventListener('click', gameStartTimer)

}
window.addEventListener('DOMContentLoaded', init)