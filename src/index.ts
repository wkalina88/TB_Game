import './main.scss';
import { App } from './app';

let canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let centerWidth = innerWidth / 2;
let centerHeight = innerHeight / 2;
let playerBallVel = 0.8; 
let playerBallRadius = 20;
let playerBallPosX = centerWidth;
let playerBallPosY = centerHeight;

let canMoveLeft: boolean = false;
let canMoveRight: boolean = false;
let canMoveDown: boolean = false;
let canMoveUp: boolean = false;

let numberOfEnemies = 10;
let enemyRadius = 50;

let enemyArr: IEnemy[] = [];


window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(e: any) {
    let x: number = e.alpha;
    let y: number = e.beta;

    //move right
    if(x >= 1 && x <= 89) {
        canMoveRight = true;
    }
    //move left
    if(x >= -89 && x <= -1) {
        canMoveLeft = true;
    }
    //move down
    if(y >= 1 && y <= 89) {
        canMoveDown = true;
    }
    //move up
    if(y >= 91 && y <= 180) {
        canMoveUp = true;
    }
    if(y == 90){
        canMoveUp = false;
        canMoveDown = false;
    }
    if(x == 0){
        canMoveLeft = false;
        canMoveRight = false;
    }
}

function drawPlayerBall() {
    
    ctx.beginPath();
    ctx.arc(playerBallPosX , playerBallPosY, playerBallRadius, 0, Math.PI*2);
    ctx.fillStyle = "silver";
    ctx.fill();
    ctx.closePath();

    if(canMoveDown == true)
    playerBallPosY -= playerBallVel;

    if(canMoveUp == true)
    playerBallPosY += playerBallVel;

    if(canMoveLeft == true)
    playerBallPosX -= playerBallVel;

    if(canMoveRight == true)
    playerBallPosX += playerBallVel;
}


interface IEnemy{
    x: number;
    y: number;
    isActive: boolean;
}

function  initEnemies(){
    for(let i = 0; i < numberOfEnemies; i++) {
        
        enemyArr.push({
            x: (Math.random()*canvas.height),
            y: (Math.random()*canvas.height),
            isActive: true
        } as IEnemy)
    }
}



function drawEnemyBalls () {
    
    for(let item of enemyArr) {
        ctx.beginPath();
        ctx.arc(item.x, item.y, enemyRadius, 0, Math.PI*2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    }

}


function collissionDetection() {
    let dx: number;
    let dy: number;
    let dist: number;

    for(let i = 0; i < enemyArr.length; i++) {
        dx = playerBallPosX - enemyArr[i].x;
        dy = playerBallPosY - enemyArr[i].y;

        dist = Math.sqrt(dx*dx + dy*dy);

        if(dist < playerBallRadius + enemyRadius){
            enemyArr[i].isActive = false;
        }
    }
    //remove unactive enemies from array
    enemyArr = enemyArr.filter((e)  => e.isActive);
}




function draw (){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawEnemyBalls();
    
    drawPlayerBall();
    collissionDetection();
    window.requestAnimationFrame(draw);

    
}


initEnemies();

window.requestAnimationFrame(draw);


const app = new App();


