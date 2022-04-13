console.log('DOM Content Loaded...')

function init(){


  // ! THE PLAN

  
  // ? Elements

  // Popups & buttons
  const rules = document.querySelector('#rules')
  // Rules button
  const rulesButton = document.querySelector('#rules-btn')
  // Exit button
  const exitbtn = document.querySelector('.exit')
  // -------------
  // New game button
  const newGame = document.querySelector('#new-game')
  // Lose popup
  const losePopUp = document.querySelector('#lose')
  // -------------
  // The audio/music
  const music = document.querySelector('#music')
  const musicbtn = document.querySelector('#musicbtn')

  // Create variables for grid and cells
  const grid = document.querySelector('#grid')
  const width = 20
  const cellCount = width * width
  console.log(cellCount)

  const cells = []

  // Create variable for the food
  // Create variable for buttons, 'new game', 'start', 'pause-resume' & 'rules'
  // Create variable for rules and lose popup div
  // Create variable for popup exit button
  // Create variable for span element that updates the points
  // Create variable for music button & audio element


  // * The Grid
  // Create a 10 x 10 grid
  // Create a 10 x 10 grid using a function that has a for Loop

  function createGrid(){

    for(let i = 0; i < cellCount; i++){
      // Create the cell
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cell.id = i
      // cell.innerText = i
      cells.push(cell)

    }
    // Add the snake @ start of game
    addSnake(currentPosition)
    
  }

  // * Pupups Functions
  // The Rules
  function handleRulesClick(event){
    rules.style.visibility = 'visible'
    rules.style.transform = 'scaleX(1) scaleY(1)'
    rules.style.opacity = '1'
  }
  // Exit button function
  function exitPopUp(){
    rules.style.visibility = 'hidden'
    rules.style.transform = 'scaleX(0.7) scaleY(0.7)'
    rules.style.opacity = '0'
  }
  // Start new game / refresh function
  function handleStartAgain() {
    losePopUp.style.visibility = 'hidden'
    losePopUp.style.transform = 'scaleX(0.7) scaleY(0.7)'
    losePopUp.style.opacity = '0'
    window.location.reload(false)
  }

  // * The Audio
  // The music function
  function playMusic() {
    let isIt = null
    if(isIt){
      music.pause()
    } else {
      isIt = music.play()
      console.log('the music')
    }
  }


  // * The Snake Character
  // Create variable for the snake (head)
  const snakeClass = 'snake'

  const startPosition = 44 // Snake STARTING position
  let currentPosition = [startPosition, startPosition + width] // Snake position that changes
  
  
  let snakeMove // global variable - accessible everywhere

  // Determines the interval (setInterval) speed
  let snakeSpeed = 250

  // Make it so that the snake gets bigger with every bit of food
    // function with an if statement
    // Player gains one point for every piece of food
    const snakeArray = []

    // function growBody(position){
    // snakeArray.push(snakeClass)
    // }

  // * The Food
  const foodClass = 'food'
  // For food
  let randomIndex = Math.floor(Math.random() * 100)

  // ? Keep track of how much food is eaten, to convert to snakeLength ?
  let snakeLength = 0
  

  // ? Execution

  // Adding the Snake
  function addSnake(positions){
    positions.forEach((i) => {
      cells[i].classList.add(snakeClass)
    })
      
  }

  // Removing the Snake
  function removeSnake(positions){
    // cells[positions].classList.remove(snakeClass)
    positions.forEach((i) => {
      cells[i].classList.remove(snakeClass)
    })
  }

  // Adding food class to random cells
  function addFood(){
    
    let looping = true
    console.log('snake position', currentPosition)
    console.log('the random number', randomIndex)
    
    
    while(looping){
      randomIndex = Math.floor(Math.random() * 100)
      if (currentPosition.includes(randomIndex)){ // Make it so that food isn't added in same place as snake body
        console.log('we don\'t want ->', currentPosition[randomIndex])
        console.log('contains snake body')
      } else{
        cells[randomIndex].classList.add(foodClass)
        console.log('new position')
        looping = false
      }
    }
  }

   // Eat food & Make new food appear in a random cell (after old food is eaten (repeated))
  function eatFood(positions){
    if(cells[positions[0]].classList.contains(foodClass)){
      // console.log('snakeArray ->', snakeArray)
      
      cells[positions[0]].classList.remove(foodClass)
      currentScore += 1
      scoreSpan.innerText = currentScore

      addFood(randomIndex)
      snakeSpeed -= 2
      return true
    }
    return false
  }

  // If the snake 'bumps' into itself -> 'dies'
  function snakeDie(positions){
    // console.log('snakeDie position ->', currentPosition[0])
    if(currentPosition.includes(positions[0], 1)){
      console.log('you lose')
      return true
    }
    return false
  }


  // * The points
  const startScore = 0
  let currentScore = startScore
  const scoreSpan = document.querySelector('#score-span')
  scoreSpan.innerText = currentScore

  // check if food class is present - .contains() method
  // conditional
  // if present then remove & add score

  // Previous direction
  let oldDirection

  console.log('old direction ->', oldDirection)

  // Allow the player to move the snake around the grid using arrow keys
  // Keydown event

  function handleKeyDown(event){
    
    const key = event.keyCode
    const up = 38
    const down = 40
    const left = 37
    const right = 39


    if(oldDirection === up && key === down){
      return 
    }else if(oldDirection === down && key === up){
      return
    }else if(oldDirection === left && key === right){
      return
    }else if(oldDirection === right && key === left){
      return
    } else if (key !== up && key !== down && key !== left && key !== right){
      return
    }
  

    // Set old position to key pressed
    oldDirection = key

// if I didn't have a global variable for snakeMove,
// I wouldn't be able to clearInterval(snakeMove) before the snakeMove below
    if(snakeMove){
    clearInterval(snakeMove) // if snakeMove has a value, clear the interval
    }
    
// Make it so that the snake keeps moving in said direction
    snakeMove = setInterval(() => {
      
    
    // remove snake at old position
    removeSnake(currentPosition)
    

    // control flow
    
    if(key === up){
      if(currentPosition[0] - width < 0){
        currentPosition.unshift(currentPosition[0] + (cellCount - width))
      } else {
        currentPosition.unshift(currentPosition[0] - width)
      }
    } else if (key === down){
      if(currentPosition[0] + width >= cellCount){
        currentPosition.unshift(currentPosition[0] - (cellCount - width))
      } else {
      currentPosition.unshift(currentPosition[0] + width)
      }
    } else if (key === left){
      if(currentPosition[0] % width === 0){
        currentPosition.unshift(currentPosition[0] + (width - 1))
      } else {
        currentPosition.unshift(currentPosition[0] - 1)
      }
    } else if(key === right){
      if(currentPosition[0] % width === 19){
        currentPosition.unshift(currentPosition[0] - (width - 1))
      } else {
        currentPosition.unshift(currentPosition[0] + 1)
      }
    }else {
      console.log('invalid key')
    }

    // stop Player from moving directly against self
    const snakeCrash = snakeDie(currentPosition)

    if (!!snakeCrash) {
      // window.location.reload(false)
      currentPosition = []
      losePopUp.style.visibility = 'visible'
      losePopUp.style.transform = 'scaleX(1) scaleY(1)'
      losePopUp.style.opacity = '1'
    }

    // Make new food appear in a random cell after old food is eaten (repeated)
    const foodEaten = eatFood(currentPosition)
    // console.log(foodEaten)

    if(!foodEaten){
    currentPosition.pop()
    }
    // add snake to new position

    addSnake(currentPosition)

    // console.log('modulus', currentPosition[0] % width)
    
    // console.log('snake speed ->', snakeSpeed)


    
    
    
    
    }, snakeSpeed)

    
    
  }

  

  // Make the snake speed up as it eats more

  // Player 'dies' when it 'hits' the edge of the grid or itself

  // A popup that tells the player if they die

  // Start/New Game button
    // - each click, the text toggles between 'Start' & 'New Game'



  // ? Events

  // An event that starts the game (or starts a new game)



  // keyDown event so that the user can control the snake
  document.addEventListener('keydown', handleKeyDown)

  // An event that pauses and resumes the game

  // An event that shows the rules
  rulesButton.addEventListener('click', handleRulesClick)
  // An event that closes the popup
  exitbtn.addEventListener('click', exitPopUp)
  // An event that starts a new game
  newGame.addEventListener('click', handleStartAgain)

  // An event to mute and unmute the music

  musicbtn.addEventListener('click', playMusic)


  createGrid()

  

  // Make a cell of food appear in a random location on the grid when the game starts
  addFood()

  // * Bonus

  // Pause/Resume button
    // - each click, the text toggles between 'Pause' & 'Resume'

  // Create portal elements that allow the player to jump to different areas of the grid

  // Player can choose Easy or Hard mode:
    // Easy mode ---> snake can move through walls to the other side, dies when it hits itself
    // Hard mode ---> snake dies when it hits a wall

  // Give the player a choice between 'New School' and 'Old School' styling

  // Responsive design

  // Multi-player mode

  // High score table

  

}


window.addEventListener('DOMContentLoaded', init)

