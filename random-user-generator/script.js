let personName = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let userLocation = document.getElementById('location');
let age = document.getElementById('age');
let picture = document.getElementById('picture');
let generateButton = document.getElementById('generate');

function getRandomUser() {
  fetch('https://randomuser.me/api/')
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data.results[0];
    })
    .then((person) => {
      if (person.gender === 'female') {
        document.body.style.backgroundColor = 'purple';
      } else if (person.gender === 'male') {
        document.body.style.backgroundColor = 'lightblue';
      } else {
        document.body.style.backgroundColor = 'gray';
      }

      personName.innerHTML = `<span class="font-bold">Name: </span>${
        person.name.first + ' ' + person.name.last
      }`;

      email.innerHTML = `<span class="font-bold">Email: </span>${person.email}`;

      phone.innerHTML = `<span class="font-bold">Phone: </span>${person.phone}`;

      userLocation.innerHTML = `<span class="font-bold">Location: </span>${
        person.location.city + ', ' + person.location.state
      }`;

      age.innerHTML = `<span class="font-bold">Age: </span>${person.dob.age}`;

      picture.src = `${person.picture.medium}`;
    });
}

generateButton.addEventListener('click', getRandomUser);
window.addEventListener('DOMContentLoaded', getRandomUser);
