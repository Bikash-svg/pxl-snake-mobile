const gameBoardArea = document.querySelector(".board");
const startButton = document.querySelector('.btn-start')
const restarButton = document.querySelector('.btn-restart')
// modal is the starting display that appers on start and endgin
const modal = document.querySelector('.modal')
const startingDisplay = document.querySelector('.startGame')
const endingDisplay = document.querySelector('.endGame')
// score element
const highScoreElement = document.querySelector('#high-score')
const scoreElement = document.querySelector('#score')
const timerElement = document.querySelector('#time')

const blockHeight = 20;
const blockWidth = 20;

// calculating the number of rows and columns that can fit in the game board area
const rows = Math.floor(gameBoardArea.clientHeight / blockHeight);
const cols = Math.floor(gameBoardArea.clientWidth / blockWidth);
// calculating the canter of the rows and cols 
const rowCenter = Math.floor(rows / 2);
const colCenter = Math.floor(cols / 2);

// this variable is for storing the interval ID of the setInterval function so we can clear it when the game is over

// for mobile direction
const leftBtn = document.querySelector('.leftBtn')
const upBtn = document.querySelector('.upBtn')
const downBtn = document.querySelector('.downBtn')
const rightBtn = document.querySelector('.rightBtn')


// all nessary elements
    // creating a 2D array to store the blocks of the game board area and a snake array to store the position of the snake
    const blocks =[]
    let snake = [
        {
            x: rowCenter, y: colCenter,
        },
    ]
    const snakeBody = document.createElement('div')
            snakeBody.classList.add("snakeBody")
    let food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}
    console.log(food)

    let highScore =localStorage.getItem('highScore') || 0;
        highScoreElement.innerText = highScore;
    let score = 0;
    let time = `00-00`;

    let intervalID = null;
    let timeIntervalID = null;


// creating the square table for the game
    for(let row=0; row<rows; row++){
        for(let col=0; col<cols; col++){
            const block = document.createElement('div')
            block.classList.add("block")
            gameBoardArea.appendChild(block)
            // block.innerText = `${row}-${col}`
            blocks[`${row}-${col}`] = block
        }
    }


// rendring the snake on the disply 
    snakeRander = () => {
        let head = null;

        // for moving the snake to right
        if(direction === "right"){
            head = {x: snake[ 0 ].x, y: snake[ 0 ].y + 1 }
        }
        // for moving the snake to left
        else if(direction === "left"){
            head = {x: snake[ 0 ].x, y: snake[ 0 ].y - 1 }
        }
        // for moving the snake to up
        else if(direction === "up"){
            head = {x: snake[ 0 ].x - 1 , y: snake[ 0 ].y }
        }
        // for moving the snake to down
        else if(direction === "down"){
            head = {x: snake[ 0 ].x + 1, y: snake[ 0 ].y }
        }
        else{
            head = {x: snake[ 0 ].x, y: snake[ 0 ].y }
        }


    // ending the game
        if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
            // alert("Game over");
            clearInterval(intervalID)
            modal.style.display = 'flex'
            endingDisplay.style.display = 'flex'
            startingDisplay.style.display = 'none'

            return;
        }

    // removing the areas where the snake array is not exist
        snake.forEach(segment => {
            blocks[ `${segment.x}-${segment.y}` ].classList.remove('fill')
        })    

        // unshift is for adding a new object in the snake array so it feels like it moving forword
        snake.unshift(head)

        // pop is for removing the last object from the back of the snake to make it look like moving
        snake.pop()

        // filling the areas where the snake array is exist
        snake.forEach(segment => {
            blocks[ `${segment.x}-${segment.y}` ].classList.add('fill')
        })


    // Q > where the adding snake part comes after the snake array removing part






    // for food

        blocks[ `${food.x}-${food.y}` ].classList.add('food')
        if(head.x == food.x && head.y == food.y){
            // removing the previous food as the snake eats the food
            blocks[ `${food.x}-${food.y}` ].classList.remove('food')

            // sponing the food on random places on the board
            food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}
            blocks[ `${food.x}-${food.y}` ].classList.add('food')

            // increasing snake body as it eats the food
            snake.unshift(head)

            // food eating score
            // increasing score as the snake eats the food
            score += 10;
            scoreElement.innerText = score;
            // for high score
            if(score > highScore){
                highScore = score;
                localStorage.setItem('highScore', highScore.toString())
                // not need this
                // highScoreElement.innerText = highScore
            }
        }
    }




// starting the game

    // starting the game on btn click
    startButton.addEventListener('click', () => {
        startSnakeGame()
    })
    // starting the game on enter
    addEventListener("keydown", (elem)=>{
        if(elem.key == 'Enter' && modal.style.display !== 'none'){
            startSnakeGame()
        }
    })

    // for the timer functino
    timerfunction = () => {
        timeIntervalID = setInterval(() => {
            // making an array to keep time
            let [ min, sec ] = time.split("-").map(Number)
            // timer
            if(sec ==  59){
                min += 1;
                sec = 0;
            }
            else{
                sec += 1;
            }
            // display time
            time = `${min}-${sec}`;
            timerElement.innerText = time;
        }, 1000)
    }
    
    
    // to start the game on when the function is called
    startSnakeGame = () => {
        intervalID = setInterval(()=>{
            modal.style.display = 'none'
            //randring the snake in every 1s
            snakeRander()
        }, 150)
        timerfunction()
    }
    



// restarting the game

    // restarting the game on btn click
    restarButton.addEventListener("click", () => {
        restartSnakeGame()
    })

    // restartin the game on enter
    document.addEventListener("keydown", (elem)=>{
        if(elem.key == 'Enter' && modal.style.display !== 'none'){
            // restartSnakeGame()
            restartSnakeGame()
        }
    })

    // to restart the game on when the function is called
    restartSnakeGame = () => {
        // removing the snake game previous food
        blocks[ `${food.x}-${food.y}` ].classList.remove('food')
        // removing the snake game previous snake body 
        snake.forEach(segment => {
            blocks[ `${segment.x}-${segment.y}` ].classList.remove('fill')
        })


        //for restarting the game
        direction = 'center'
        modal.style.display = 'none'
        snake = [
            {
                x: rowCenter, y: colCenter,
            }
        ]
        food = food = {x:Math.floor(Math.random()*rows), y:Math.floor(Math.random()*cols)}
        intervalID = intervalID = setInterval(()=>{ snakeRander() }, 150)
        

        // resetting score and time
        score = 0;
        scoreElement.innerText = score;
        time = `00-00`
        timerElement.innerText = time;
        highScoreElement.innerText = highScore;
    }

// direction

    // this variable is for storing the direction of the snake
    let direction = 'center';

    // for mobile direction
    rightBtn.addEventListener('click', () => {
        direction = 'right'
    })
    leftBtn.addEventListener('click', () => {
        direction = 'left'
    })
    upBtn.addEventListener('click', () => {
        direction = 'up'
    })
    downBtn.addEventListener('click', () => {
        direction = 'down'
    })
    
    // getting direction form the user
    addEventListener("keydown", (event)=>{
        if(event.key === 'ArrowRight'){
            direction = 'right'
        }
        else if(event.key === 'ArrowLeft'){
            direction = 'left'
        }
        else if(event.key === 'ArrowUp'){
            direction = 'up'
        }
        else if(event.key === 'ArrowDown'){
            direction = 'down'
        }
    })


