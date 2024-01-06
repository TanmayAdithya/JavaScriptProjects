const itemInput = document.getElementById('item-input');
const shoppingList = document.getElementById('item-list');
const itemForm = document.getElementById('item-form');
const clearBtn = document.getElementById('clear');
const filterItems = document.getElementById('filter');

function clearItems() {
  while (shoppingList.firstChild) {
    shoppingList.removeChild(shoppingList.lastChild);
  }
  clearShoppingList();
  resetUI();
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure you want to delete?')) {
      // Remove from the DOM
      e.target.parentElement.parentElement.remove();
      // Remove from Local Storage
      removeFromLocalStorage(e);
    }
  }
  resetUI();
}

function addToList(e) {
  e.preventDefault();

  if (itemInput.value == '') {
    alert('Enter something');
  } else {
    addToDOM();
  }

  itemInput.value = '';
  resetUI();
}

function filterList(e) {
  const li = shoppingList.querySelectorAll('li');
  const search = e.target.value.toLowerCase();

  li.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(search) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function resetUI() {
  const li = shoppingList.querySelectorAll('li');
  if (li.length === 0) {
    filterItems.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    filterItems.style.display = 'block';
    clearBtn.style.display = 'block';
  }
}

function addToDOM() {
  let item = document.createElement('li');
  item.innerHTML =
    itemInput.value +
    `<button class="remove-item btn-link text-red">
      <i class="fa-solid fa-xmark"></i>
    </button>`;
  shoppingList.appendChild(item);
  addToLocalStorage(item);
}

function addToLocalStorage(item) {
  let itemsFromLocalStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromLocalStorage = [];
  } else {
    itemsFromLocalStorage = JSON.parse(localStorage.getItem('items'));
  }

  itemsFromLocalStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromLocalStorage));
}

function removeFromLocalStorage(e) {}

function clearShoppingList() {
  localStorage.clear();
}

//Event listeners
shoppingList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemForm.addEventListener('submit', addToList);
filterItems.addEventListener('input', (e) => filterList(e));

resetUI();
