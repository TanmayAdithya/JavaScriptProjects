const initialTime = 10 * 60;
let currentTime = initialTime;
let time = document.querySelector('.time');
const startTimer = document.querySelector('button');

function updateTime() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  time.innerHTML = `<h3 class="time">${minutes}:${seconds}</h3>`;
}

function startCount() {
  if (currentTime > 0) {
    currentTime--;
    updateTime();
    setTimeout(startCount, 1000);
  } else {
    time.innerHTML = `<h3 class="time">Time Up!</h3>`;
  }
}

function onClick() {
  startCount();
}

startTimer.addEventListener('click', onClick);
