// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the size of the grid and the number of tiles
const gridSize = 20;
const tileCount = 20;

// Initialize the snake with one segment at the center of the grid
let snake = [{ x: 10, y: 10 }];

// Initialize the food position
let food = { x: 15, y: 15 };

// Initialize the obstacles
let obstacles = [
  { x: 5, y: 5 },
  { x: 10, y: 5 },
  { x: 15, y: 5 }
];

// Initialize the direction of the snake (dx, dy)
let dx = 0;
let dy = 0;

// Initialize the score
let score = 0;

// Set the canvas size
canvas.width = canvas.height = gridSize * tileCount;

// Function to draw the game elements
function draw() {
  // Clear the canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = 'lime';
  snake.forEach(part => ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2));

  // Draw the food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

  // Draw the obstacles
  ctx.fillStyle = 'gray';
  obstacles.forEach(obstacle => ctx.fillRect(obstacle.x * gridSize, obstacle.y * gridSize, gridSize - 2, gridSize - 2));

  // Draw the score
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${score}`, 10, 10);
}

// Function to update the game state
function update() {
  // Calculate the new head position
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Wrap the snake position when it goes beyond the canvas boundaries
  if (head.x < 0) {
    head.x = tileCount - 1;
  } else if (head.x >= tileCount) {
    head.x = 0;
  }
  if (head.y < 0) {
    head.y = tileCount - 1;
  } else if (head.y >= tileCount) {
    head.y = 0;
  }

  // Check if the snake has eaten the food
  if (head.x === food.x && head.y === food.y) {
    // Increase the score
    score++;
    // Generate new food position
    food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
  } else {
    // Remove the last segment of the snake
    snake.pop();
  }

  // Add the new head to the snake
  snake.unshift(head);

  // Check for collisions with itself or obstacles
  if (snake.slice(1).some(part => part.x === head.x && part.y === head.y) ||
      obstacles.some(obstacle => obstacle.x === head.x && obstacle.y === head.y)) {
    // Reset the game if a collision occurs
    resetGame();
  }
}

// Function to reset the game
function resetGame() {
  // Reset the snake to its initial state
  snake = [{ x: 10, y: 10 }];
  // Reset the direction
  dx = dy = 0;
  // Reset the score
  score = 0;
}

// Function to change the direction of the snake based on keyboard input
function changeDirection(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (dy === 0) { dx = 0; dy = -1; }
      break;
    case 'ArrowDown':
      if (dy === 0) { dx = 0; dy = 1; }
      break;
    case 'ArrowLeft':
      if (dx === 0) { dx = -1; dy = 0; }
      break;
    case 'ArrowRight':
      if (dx === 0) { dx = 1; dy = 0; }
      break;
  }
}

// Add an event listener for keyboard input
document.addEventListener('keydown', changeDirection);

// Main game loop
function gameLoop() {
  // Update the game state
  update();
  // Draw the game elements
  draw();
  // Repeat the game loop every 100 milliseconds
  setTimeout(gameLoop, 100);
}

// Start the game loop
gameLoop();
