console.log('DOM Content Loaded...')

function init(){


  // ! THE PLAN

  
  // ? Elements

  // Create variables for grid and cells
  const grid = document.querySelector('#grid')
  const width = 10
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
      cell.innerText = i
      cells.push(cell)

    }
    // Add the snake @ start of game
    addSnake(currentPosition)
  }

  // * The Snake Character
  // Create variable for the snake (head)
  const snakeClass = 'snake'

  const startPosition = 44 // Snake STARTING position
  let currentPosition = [startPosition, startPosition + width] // Snake position that changes



  let snakeMove // global variable - accessible everywhere

  let delay

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
    // cells[position].classList.add(snakeClass)
    console.log(positions)
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
  function addFood(position){
    cells[position].classList.add(foodClass)
  }

   // Eat food & Make new food appear in a random cell (after old food is eaten (repeated))
  function eatFood(positions){
    if(cells[positions[0]].classList.contains(foodClass)){
      // console.log('snakeArray ->', snakeArray)
      randomIndex = Math.floor(Math.random() * 100)
      cells[positions[0]].classList.remove(foodClass)
      currentScore += 1
      scoreSpan.innerText = currentScore

      // snakeArray.push(snakeClass)
      // snakeArray.forEach((i) => {
      //   cells[i].classList.add('snake')
      // })

      // cells[snakeArray].classList.add('snake')
      // cells[position + 1].classList.add(snakeClass)
      // // foodEaten += 1
      
      // // cells.splice(currentPosition, 0, snakeClass)

      // for(let i = 0; i < snakeArray.length; i++){
      // snakeArray[i].classList = cells[i].classList
      // cells.splice(i, 0, snakeClass)
      // console.log(cells)

      addFood(randomIndex)
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



  // Allow the player to move the snake around the grid using arrow keys
  // Keydown event

  function handleKeyDown(event){
    
    const key = event.keyCode
    const up = 38
    const down = 40
    const left = 37
    const right = 39

// if I didn't have a global variable for snakeMove,
// I would be able to clearInterval(snakeMove) before the snakeMove below
    if(snakeMove){
    clearInterval(snakeMove) // if snakeMove has a value, clear the interval
    }
    // if(delay){
    //   clearInterval(delay)
    // }
    
// Make it so that the snake keeps moving in said direction
    snakeMove = setInterval(() => {
      
    // delay = setInterval(() => {
    // remove snake at old position
    removeSnake(currentPosition)
  // }, 800)
    
    // const oldPosition = document.querySelector('.snake')
    // const oldTime = document.addEventListener('keydown', setInterval)
    // let currentKey = key
    
    // control flow
    
    if(key === up){
      if(currentPosition[0] - width < 0){
        currentPosition.unshift(currentPosition[0] + (cellCount - width))
        console.log('up')
      } else {
      currentPosition.unshift(currentPosition[0] - width)
      console.log('up')
      }
      console.log('trying ->', currentPosition[0])
    } else if(key === down){
      if(currentPosition[0] + width > cellCount){
        currentPosition.unshift(currentPosition[0] - (cellCount - 10))
        console.log('up')
      } else {
      console.log('down')
      currentPosition.unshift(currentPosition[0] + width)
      }
    }else if(key === left){
      console.log('left')
      currentPosition.unshift(currentPosition[0] - 1)
    } else if(key === right){
      console.log('right')
      currentPosition.unshift(currentPosition[0] + 1)
    } else if(cells[currentPosition[1]].classList.contains(foodClass)){
      console.log('invalid key')
    } else {
      console.log('invalid key')
    }

    // stop Player from moving directly against self


    // Make new food appear in a random cell after old food is eaten (repeated)
    const foodEaten = eatFood(currentPosition)
    console.log(foodEaten)

    if(!foodEaten){
    currentPosition.pop()
    }
    // add snake to new position


    addSnake(currentPosition)


    // console.log(currentPosition % width)


    
    
    
    
    }, 200)
    
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
  

  // !

  // document.addEventListener('keydown', handleUp)
  // document.addEventListener('keydown', handleDown)
  // document.addEventListener('keydown', handleLeft)
  // document.addEventListener('keydown', handleRight)

  // !

    // 1 - make player able to control movement of a cell



  
  // An event that pauses and resumes the game
  // An event that shows the rules
  // An event to mute and unmute the music


  createGrid()

  // Make a cell of food appear in a random location on the grid when the game starts
  addFood(randomIndex)

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

