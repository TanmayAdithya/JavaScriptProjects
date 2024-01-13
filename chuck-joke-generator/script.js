const joke = document.getElementById('joke');
const btn = document.getElementById('joke-btn');

function getJoke() {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.chucknorris.io/jokes/random');

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const data = JSON.parse(this.responseText);
      joke.innerText = data.value;
    }
  };
  xhr.send();
}

btn.addEventListener('click', getJoke);
document.addEventListener('DOMContentLoaded', getJoke);
