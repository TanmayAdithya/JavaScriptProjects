const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const progressBar = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

function playVideo() {
  if (video.paused) {
    document.querySelector('i.fa').classList.remove('fa-play');
    document.querySelector('i.fa').classList.add('fa-pause');
    video.play();
  } else {
    document.querySelector('i.fa').classList.remove('fa-pause');
    document.querySelector('i.fa').classList.add('fa-play');
    video.pause();
  }
}

function updateProgress() {
  progressBar.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let minutes = Math.floor(video.currentTime / 60);
  if (minutes < 10) {
    minutes = '0' + String(minutes);
  }
  let seconds = Math.floor(video.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + String(seconds);
  }
  timestamp.innerHTML = `${minutes}:${seconds}`;
}

function stopVideo() {
  video.pause();
  video.currentTime = 0;
  document.querySelector('i.fa').classList.remove('fa-pause');
  document.querySelector('i.fa').classList.add('fa-play');
}

function setProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

playBtn.addEventListener('click', playVideo);
stopBtn.addEventListener('click', stopVideo);
video.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);
