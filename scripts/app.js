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
  const grid = document.querySelector('.grid')


  let score = document.querySelector('#score')
  let time = document.querySelector('#time')
  let lives = document.querySelector('#lives')
  
  //--------------------- Game Variables -------------------//
  // grid
  const width = 18
  const gridCount = width * width
  let cells = []
  let playerPosition = 314
  
  
  let timerCount = 5


  //----------------------- Functions ----------------------//
  // inGame Sounds
  function playSound(e) {
    // introTrack.play()
  }

  // gameStart timer
  function gameStartTimer(e) {
    intro.remove()
    // select sound related to gameOption
    if (e.currentTarget === orignalOption) {
      emperorLaugh.play()
    } else if (e.currentTarget === sosOption) {
      emperorGood.play()
    }
    // interval to set timer conditions
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

  // gameGrid creation
  function gameGrid(startingPosition) {
    for (let i = 0; i < gridCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells[startingPosition].classList.add('pShip')
  }
  gameGrid(playerPosition)

  function playerMovement(e) {
    cells[playerPosition].classList.remove('pShip')
    const x = playerPosition % width
    const y = ~~(playerPosition / width)
    console.log(e.keyCode)
    switch (e.keyCode) {
      case 68:
        if (x < width - 1) {
          playerPosition++
        }
        break
      case 65:
        if (x > 0) {
          playerPosition--
        }
        break
      case 83:
        if (y < width - 1) {
          playerPosition += width
        }
        break
      case 87:
        if (y > 13) {
          playerPosition -= width
        }
        break
    }
    cells[playerPosition].classList.add('pShip')
  }
  //---------------------- Event Listener --------------------//

  docBody.addEventListener('click', playSound)
  orignalOption.addEventListener('click', gameStartTimer)
  sosOption.addEventListener('click', gameStartTimer)
  document.addEventListener('keydown', playerMovement)

}
window.addEventListener('DOMContentLoaded', init)