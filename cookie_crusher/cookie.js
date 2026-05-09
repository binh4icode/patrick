const regularCookies = ["images/cookie.png", "images/donut.png", "images/icecreamcone.png", "images/facecookie.jpg.png", "images/cake.png"]
const goldenCookieImg = "images/burnt-cookie.png"

const clicksound = new Audio("sounds/click.mp3")
const bgMusic = new Audio("sounds/background.mp3")

bgMusic.loop = true;
bgMusic.volume = 0.3;
clicksound.volume = 1;


const scoreDisplay = document.getElementById("score")
const timerDisplay = document.getElementById("time")
const startBtn = document.getElementById("start-btn")
const container = document.getElementById("game-container")

let score = 0;
let timeleft = 30;
let gameActive = false;

startBtn.addEventListener("click", startgame)

function startgame() {
    score = 0;
    timeleft = 30;
    gameActive = true;
    startBtn.disabled = true;
    container.innerHTML = " ";

    bgMusic.currentTime = 0;
    bgMusic.play();

    const countdown = setInterval(() => {
        timeleft--;
        timerDisplay.innerText = timeleft;
        if (timeleft <= 0) {
            clearInterval(countdown);
            gameActive = false
            startBtn.disabled = false;
            bgMusic.pause()
            alert("Game Over! Score " + score);
        }
    }, 1000)
    setInterval(createCookie, 800);

}

function createCookie() {
    if (!gameActive) return;

    const cookie = document.createElement('img');
    cookie.classList.add('cookie');


    if (Math.random() < 0.1) {
        cookie.src = goldenCookieImg;
        cookie.dataset.points = 5;
        cookie.classList.add('golden');

    } else {
        const rand = Math.floor(Math.random() * regularCookies.length)
        cookie.src = regularCookies[rand];
        cookie.dataset.points = 1;
    }

    cookie.style.left = Math.random() * 520 + "px";
    cookie.style.top = Math.random() * 320 + "px";

    container.appendChild(cookie);


    cookie.addEventListener('mousedown', function(){
        clicksound.currentTime = 22;
        clicksound.play();
        score += parseInt(this.dataset.points);
        scoreDisplay.innerText = score;
        this.remove();
    })

    setTimeout(() => {
        if (cookie.parentElement) cookie.remove();
}, 1200);
}