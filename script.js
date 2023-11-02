const gameContainer = document.getElementById('gameContainer');
const score = document.getElementById('score');
let snake = [{x: 19, y: 0}];
let food = generateFood();
let direction = 'RIGHT';
let speed = 100;

function generateFood() {
 let foodX = Math.floor(Math.random() * 40);
 let foodY = Math.floor(Math.random() * 40);
 return {x: foodX, y: foodY};
}

function updateScore() {
 score.innerText = parseInt(score.innerText) + 1;
}

function gameOver() {
 // alert('Game Over');
 location.reload();
}

function updateGame() {
 const head = snake[0];
 let newHead = {x: head.x, y: head.y};
 switch (direction) {
    case 'UP':
      newHead.y--;
      break;
    case 'DOWN':
      newHead.y++;
      break;
    case 'LEFT':
      newHead.x--;
      break;
    case 'RIGHT':
      newHead.x++;
      break;
 }

 if (newHead.x === -1 || newHead.x === 40 || newHead.y === -1 || newHead.y === 40) {
   gameOver();
   return;
 }

 if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
   gameOver();
   return;
 }

 snake.unshift(newHead);
 if (newHead.x === food.x && newHead.y === food.y) {
   updateScore();
   food = generateFood();
 } else {
   snake.pop();
 }

 gameContainer.innerHTML = '';

 snake.forEach(segment => {
   const pixel = document.createElement('div');
   pixel.id = 'pixel' + segment.x + ':' + segment.y;
   pixel.className = 'snakeBodyPixel';
   gameContainer.appendChild(pixel);
 });

 const foodPixel = document.createElement('div');
 foodPixel.id = 'pixel' + food.x + ':' + food.y;
 foodPixel.className = 'food';
 gameContainer.appendChild(foodPixel);
}

document.addEventListener('keydown', event => {
 switch (event.key) {
   case 'ArrowUp':
     if (direction !== 'DOWN') direction = 'UP';
     break;
   case 'ArrowDown':
     if (direction !== 'UP') direction = 'DOWN';
     break;
   case 'ArrowLeft':
     if (direction !== 'RIGHT') direction = 'LEFT';
     break;
   case 'ArrowRight':
     if (direction !== 'LEFT') direction = 'RIGHT';
     break;
 }
});

setInterval(updateGame, speed);