
// GLOBAL VARIABLES

let cart = [];
let totalPrice = 0;


// SPINNER FUNCTIONS

function showSpinner() {
  document.getElementById("spiner").classList.remove("hidden");
}

function hideSpinner() {
  document.getElementById("spiner").classList.add("hidden");
}

 
// LOAD PLANTS (ALL CARDS)

const loadPlants = () => {
  showSpinner();
  fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
      displayPlants(data.plants);
      hideSpinner();
    });
};


// DISPLAY PLANTS CARDS

const displayPlants = (cards) => {
  const treeContainer = document.getElementById('treeContainer');
  treeContainer.innerHTML = ""; 
  cards.forEach(card => {
    treeContainer.innerHTML += `
      <div class="card bg-base-100 h-110 w-full shadow-sm">
        <figure class="w-full h-full p-5">
          <img class="rounded-xl object-cover w-full h-40" src="${card.image}" alt="${card.name}">
        </figure>
        <div class="card-body">
          <h2 onclick='showModal(${JSON.stringify(card)})'    class="card-title">${card.name}</h2>
          <p>${card.description}</p>
          <div class="flex items-center justify-between mb-2">
            <span class="bg-green-200 p-1 rounded-lg">${card.category}</span>
            <span>৳ ${card.price}</span>
          </div>
          <div class="card-actions w-full">
          <button onclick='addToCart(${JSON.stringify(card)})' class="bg-green-700 text-white rounded-3xl btn btn-block">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
};

 
// LOAD CATEGORIES
 
const categoryContainer = document.getElementById('categoryContainer');

const loadCategories = () => {
  showSpinner();
  fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
      displayCategories(data.categories);
      hideSpinner();
    });
};

 
// DISPLAY CATEGORIES
 
const displayCategories = (categories) => {
  categoryContainer.innerHTML = "";
  categories.forEach(category => {
    categoryContainer.innerHTML += `
      <button id="${category.id}" class="cat-btn hover:bg-green-700 hover:text-white cursor-pointer rounded-xl btn-block text-left px-5 py-2">
        ${category.category_name}
      </button>
    `;
  });

 // Add click event 
categoryContainer.addEventListener('click', (event) => {
  if (event.target.tagName === "BUTTON") {
    document.querySelectorAll('.cat-btn').forEach(btn => {
      btn.classList.remove("bg-green-700", "text-white");
    });
    event.target.classList.add("bg-green-700", "text-white");
    loadCategoryPlants(event.target.id);
  }
});

}
 
// LOAD PLANTS BY CATEGORY

const loadCategoryPlants = (id) => {
  showSpinner();
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then(res => res.json())
    .then(data => {
      displayPlants(data.plants); 
      hideSpinner();
    });
};


// CART FUNCTIONS
 
function addToCart(plant) {
  const cartContainer = document.getElementById("price-divs");
  const itemId = `cart-${plant.id}`;

  if (document.getElementById(itemId)) {
    alert("This item is already in the cart!");
    return;
  }

  const itemDiv = document.createElement("div");
  itemDiv.id = itemId;
  itemDiv.className = "flex justify-between items-center p-2 border-b";
  itemDiv.innerHTML = `
    <span>${plant.name}</span>
    <span>৳ ${plant.price}</span>
    <button onclick="removeFromCart('${itemId}', ${plant.price})" class="text-red-600 text-2xl"><i class="fa-regular fa-rectangle-xmark"></i></button>
  `;

  cartContainer.appendChild(itemDiv);
  totalPrice +=  plant.price;
  document.getElementById("total-price").innerText = totalPrice;
}

function removeFromCart(itemId, price) {
  document.getElementById(itemId).remove();
  totalPrice -= price;
  document.getElementById("total-price").innerText = totalPrice;
}


// MODAL FUNCTIONS

function showModal(plant) {
  document.getElementById("modal-image").src = plant.image;
  document.getElementById("modal-name").innerText = plant.name;
  document.getElementById("modal-description").innerText = plant.description;
  document.getElementById("modal-category").innerText = plant.category;
  document.getElementById("modal-price").innerText = plant.price;

  document.getElementById("plantModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("plantModal").classList.add("hidden");
}

 

loadPlants();
loadCategories();
