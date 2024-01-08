const shoppingList = document.getElementById('item-list');
const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const addBtn = itemForm.querySelector('button');
const clearBtn = document.getElementById('clear');
const filterItems = document.getElementById('filter');
let isEditMode = false;

function displayItems() {
  const items = getItemsFromLocalStorage();
  items.forEach((itemText) => {
    addToDOM(itemText);
  });

  resetUI();
}

function clearItems() {
  while (shoppingList.firstChild) {
    shoppingList.removeChild(shoppingList.lastChild);
  }
  clearShoppingList();
  resetUI();
}

function removeItem(item) {
  if (confirm('Are you sure you want to delete?')) {
    // Remove from the DOM
    item.remove();
    // Remove from Local Storage
    removeFromLocalStorage(item.textContent);
  }
  resetUI();
}

function addToList(e) {
  e.preventDefault();

  if (itemInput.value === '') {
    alert('Enter something');
  }

  if (isEditMode) {
    const itemToEdit = document.querySelector('.edit-mode');
    removeFromLocalStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkforDuplicates(itemInput)) {
      alert('Already exists');
      return;
    }
  }

  addToDOM(itemInput.value);
  addToLocalStorage(itemInput.value);

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
  itemInput.value = '';

  const li = shoppingList.querySelectorAll('li');
  if (li.length === 0) {
    filterItems.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    filterItems.style.display = 'block';
    clearBtn.style.display = 'block';
  }

  addBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
  addBtn.style.backgroundColor = '#333';

  isEditMode = false;
}

function checkforDuplicates(item) {
  const itemsFromLocalStorage = getItemsFromLocalStorage();
  return itemsFromLocalStorage.includes(item);
}

function getItemsFromLocalStorage() {
  let itemsFromLocalStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromLocalStorage = [];
  } else {
    itemsFromLocalStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromLocalStorage;
}

function addToDOM(item) {
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add li to the DOM
  shoppingList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addToLocalStorage(itemInput) {
  let itemsFromLocalStorage = getItemsFromLocalStorage();

  itemsFromLocalStorage.push(itemInput);
  localStorage.setItem('items', JSON.stringify(itemsFromLocalStorage));
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    updateItem(e.target);
  }
}

function updateItem(item) {
  isEditMode = true;

  shoppingList.querySelectorAll('li').forEach((li) => {
    li.classList.remove('edit-mode');
  });
  item.classList.add('edit-mode');
  addBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Update Item`;
  addBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

function removeFromLocalStorage(item) {
  let itemsFromLocalStorage = getItemsFromLocalStorage();

  itemsFromLocalStorage = itemsFromLocalStorage.filter((i) => i !== item);

  localStorage.setItem('items', JSON.stringify(itemsFromLocalStorage));
}

function clearShoppingList() {
  localStorage.clear();
}

function init() {
  //Event listeners
  shoppingList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemForm.addEventListener('submit', addToList);
  filterItems.addEventListener('input', (e) => filterList(e));
  document.addEventListener('DOMContentLoaded', displayItems);

  resetUI();
}

init();
