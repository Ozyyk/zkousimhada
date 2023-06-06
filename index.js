document.addEventListener('keydown', keyPush);

const snakeSize = 30; 
const canvas = document.querySelector("canvas");
const title = document.querySelector("h1");
const ctx = canvas.getContext("2d");
let fps = 8;
const TileCountX = canvas.width / snakeSize;
const TileCountY = canvas.height / snakeSize;



let xpos = 0;
let ypos = canvas.height /2;

let speed = snakeSize;

let velocityX = 1;
let velocityY = 0;

let foodPosX = 0;
let foodPosY = 0;
let score = 0;

let tail = [];
let snakeLenght = 3;

let gameisrunning = true;

function gameLoop(){
    if(gameisrunning){

        moveStuff();
        drawStuff();
    
        setTimeout(gameLoop, 1000 / fps);
    }
}
ResetFood();
gameLoop();


function moveStuff(){
    xpos += speed * velocityX;
    ypos += speed * velocityY;

    //wall-collision
    if(xpos > canvas.width - snakeSize){
        xpos = 0;
    } 
    else if (ypos > canvas.height - snakeSize){
        ypos = 0;
    }
    else if (xpos < 0){
        xpos = canvas.width;
    }
    else if (ypos < 0){
        ypos = canvas.height;
    }
    tail.forEach((snakePart) =>{
        if(xpos === snakePart.x && ypos === snakePart.y){
            title.innerHTML = `Prohrala si držko<3, a měla si score ${score}`;
            gameisrunning = false;
        };
    });

    tail.push({x: xpos, y: ypos});

    tail = tail.slice(-1 * snakeLenght);

    //food-collision
    if (xpos === foodPosX && ypos === foodPosY) {
        fps += 0.25;
        score++;
        title.textContent =+ score;
        snakeLenght++;
       ResetFood();
    }
}
function drawStuff(){
    rectangle("white", 0,0, canvas.width, canvas.height);
    
    DrawGrid();

    tail.forEach( snakePart =>
        rectangle("black", snakePart.x,snakePart.y, snakeSize,snakeSize)
    );

    rectangle("red", foodPosX,foodPosY,snakeSize,snakeSize);
    rectangle("purple", xpos, ypos, snakeSize, snakeSize);
}

function rectangle(color, x,y, width, height){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,width,height);
}

function keyPush (event){
    switch(event.key){
        case "ArrowUp":
            if(velocityY !== 1){
            velocityX = 0;
            velocityY =-1;
        }
        break;
        case "ArrowRight":
            if(velocityX !== -1){
            velocityX = 1;
            velocityY = 0;
        }
        break;
        case "ArrowDown":
            if( velocityY !== -1){
            velocityX = 0;
            velocityY = 1;
            }
            break;
        case "ArrowLeft":
            if(velocityX !== 1){
            velocityX = -1;
            velocityY = 0;
            }
        break;
        default:
            if (! gameisrunning) location.reload();
        break
                
            
            
    }

    
}
function DrawGrid() {
    for(let i =0;i<TileCountX;i++){
        for(let j =0;j<TileCountY;j++){
        rectangle("pink", snakeSize* i, snakeSize *j, snakeSize-1,snakeSize -1);
    }
} 
}
function ResetFood() {

    if (snakeLenght === snakeSize * TileCountY) {
        alert("Gratuluju vyhrála si<33333")
    }
    foodPosX= Math.floor(Math.random() * TileCountX) * snakeSize;
    foodPosY= Math.floor(Math.random() * TileCountY) * snakeSize;
    
    if (foodPosX === xpos && foodPosY === ypos) {
        ResetFood();
    }
    else if (
        tail.some(
            (snakePart) => snakePart.x === foodPosX && snakePart.y === foodPosY
        )
    ){
        ResetFood();
    }
}