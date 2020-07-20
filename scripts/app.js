function init() {

  //------------------------- DOM elements -----------------------//
  // All tracks
  const introTrack = document.querySelector('#intro-track')
  const countDownSound = document.querySelector('#countDown-sound')
  const emperorLaugh = document.querySelector('#emperor-laugh')
  const emperorGood = document.querySelector('#emperor-good')
  const laserSound = document.querySelector('#laser-sound')
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
  
  //----------------------- Game Variables ---------------------//
  // grid
  const width = 18
  const gridCount = width * width
  const cells = []
  //------------------------------
  // player & enemy grid set up
  let enemiesPositionIndex = [
    5, 6, 7, 8, 9, 10, 11, 12,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 65, 66, 130,
    39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 67,
    56, 57, 58, 59, 60, 61, 62, 77, 78, 79, 63, 64, 68,
    82, 83, 84, 85, 76, 75, 80, 81, 69, 86, 74, 87, 92,
    92, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
    105, 93, 111, 112, 113, 114, 115, 116, 117, 118, 119,
    120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138,
    139, 149, 150, 151, 152, 153, 154, 155, 156
  ]
  const EnemyDirectionsPattern = [
    -1, -1, 
    width, 
    1, 1, 1, 1,
    width,
    -1, -1
  ]
  let movementCount = 0
  let playerPosition = 314
  let timerCount = 5
  let scoreCount = 0
  let livesCount = 3

  //-------------------------- Functions ------------------------//
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

  // gameGrid creation & player position
  function gameGrid(startingPosition) {
    for (let i = 0; i < gridCount; i++) {
      const cell = document.createElement('div')
      // cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells[startingPosition].classList.add('playerShip')
  }
  gameGrid(playerPosition)

  // enemyGrid position
  function enemyGridPosition() {
    enemiesPositionIndex.forEach(enemy => {
      cells[enemy].classList.add('enemyShip')
    })
  }
  enemyGridPosition()

  // Initialise enemyMovements
  // function enemyMoveActions() {
  //   setInterval(() => {
  //     enemiesPositionIndex.forEach(enemy => {
  //       cells[enemy].classList.remove('enemyShip')
  //     })
  
  //     enemiesPositionIndex = enemiesPositionIndex.map(enemy => {
  //       return enemy + EnemyDirectionsPattern[movementCount]
  //     })
  
  //     enemiesPositionIndex.forEach(enemy => {
  //       cells[enemy].classList.add('enemyShip')
  //     })
  //     movementCount++

  //     if (movementCount === EnemyDirectionsPattern.length) {
  //       movementCount = 0

  //     } else {
  //       setTimeout(() => {
  //         console.log('Game Over')
  //         console.log('Game Should end')
  //         return 
  //       }, 2000)
  //     }
  //   }, 200)
  // }
  // enemyMoveActions()

  // spaceShip Player movement
  function playerMovement(e) {
    cells[playerPosition].classList.remove('playerShip')
    const x = playerPosition % width
    const y = ~~(playerPosition / width)
    // console.log(e.keyCode)
    switch (e.keyCode) {
      case 68:
        if (x < width - 1) {
          playerPosition++
          console.log('Move right')
        }
        break
      case 65:
        if (x > 0) {
          playerPosition--
          console.log('Move Left')
        }
        break
      case 83:
        if (y < width - 1) {
          playerPosition += width
          console.log('Move Down')
        }
        break
      case 87:
        if (y > 13) {
          playerPosition -= width
          console.log('Move Up')
        }
        break
    }
    cells[playerPosition].classList.add('playerShip')
  }

  function playerLaser(e) {
    let laserIndex
    console.log(e.keyCode)
    if (e.keyCode === 32) {
      laserIndex = playerPosition
      console.log('Shooting')
      laserSound.play()
      e.preventDefault()
    }
    const laserMovement = setInterval(() => {

      if (laserIndex - width >= 0) {
        cells[laserIndex].classList.remove('playerLaser')
        laserIndex -= width
        cells[laserIndex].classList.add('playerLaser')
      } else {
        cells[laserIndex].classList.remove('playerLaser')
      }
    }, 200)
  }

  //----------------------- Event Listener ----------------------//

  docBody.addEventListener('click', playSound)
  orignalOption.addEventListener('click', gameStartTimer)
  sosOption.addEventListener('click', gameStartTimer)
  document.addEventListener('keydown', playerMovement)
  document.addEventListener('keydown', playerLaser)

}
window.addEventListener('DOMContentLoaded', init)