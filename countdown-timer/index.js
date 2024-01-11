const initialTime = 10 * 60;
let currentTime = initialTime;
let time = document.querySelector('.time');
const startTimer = document.querySelector('button');
let timerId;

function updateTime() {
  const minutes = Math.floor(currentTime / 60);
  const seconds =
    currentTime % 60 < 10 ? `0${currentTime % 60}` : currentTime % 60;
  time.innerHTML = `<h3 class="time">${minutes}:${seconds}</h3>`;
}

function startCount() {
  if (currentTime > 0) {
    currentTime--;
    updateTime();
    timerId = setTimeout(startCount, 1000);
  } else {
    time.innerHTML = `<h3 class="time">Time Up!</h3>`;
  }
}

function stopCount() {
  clearTimeout(timerId);
}

function onClick() {
  if (startTimer.textContent === 'Start') {
    startCount();
    startTimer.textContent = 'Stop';
  } else {
    stopCount();
    startTimer.textContent = 'Start';
    time.innerHTML = `<h3 class="time">10:00</h3>`;
    currentTime = initialTime;
  }
}
startTimer.addEventListener('click', onClick);
