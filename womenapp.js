

// SELECT ELEMENTS

const productsEl = document.querySelector('.products');
const cartItemsEl = document.querySelector('.cart-items');
const subTotal = document.querySelector('.subtotal');
const totalItemsInCartEl = document.querySelector('.total-items-in-cart');

// RENDER the prodcuts function

function renderDress () {
  dress.forEach((product) => {
    productsEl.innerHTML += `
    <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                        ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
    
    
    `   
    
    
    // we are using += instead of equal because we do not want to overwrite the already products there 
  })
}

renderDress();
// CREATE the card array to save the items there 

// let cart = []; Instead of an empty array we can just use the local storage or an empty array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart()

// ADD to cart function

function addToCart(id) {
  // check if the product is already available and exists in the cart

  if(cart.some((item) => item.id === id)) {
    changeNumberOfUnits('plus', id)
  }
   else {
     const item = dress.find((product) => {
       return product.id === id
      })
      cart.push({
        ...item, numberOfUnits : 1
      });
     
}

updateCart()
}
// update cart function


function updateCart() {
  renderCartItems();
  rendSubtotal();
  
  // Save cart to local storage
  
 localStorage.setItem("CART", JSON.stringify(cart))

}
// calculate and render te value of subtotal

function rendSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subTotal.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
  totalItemsInCartEl.innerHTML = totalItems;
}

// renderCartItems
function renderCartItems() {
  cartItemsEl.innerHTML = "";
  cart.forEach((item) => {
     cartItemsEl.innerHTML += `
        <div class="cart-item">
                    <div class="item-info" onclick="removeItemFromCart(${item.id})">
                        <img src="${item.imgSrc}" alt="${item.name}">
                        <h4>${item.name}</h4>
                    </div>
                    <div class="unit-price">
                        <small>$</small>${item.price}
                    </div>
                    <div class="units">
                        <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                        <div class="number">${item.numberOfUnits}</div>
                        <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
                    </div>
        </div>
     ` 
  })
}


// remove items from a card

function removeItemFromCart(id) {
 cart =  cart.filter((item) => {
    return item.id !== id;
  });
  updateCart();
};


// change number of unit func
function changeNumberOfUnits(action, id) {
   cart = cart.map((item) => {
      let numbersOfUnits = item.numberOfUnits;
        if (item.id === id) {
          if(action === 'minus' && numbersOfUnits > 1) {
            numbersOfUnits--;
          }
          else if(action === 'plus' && numbersOfUnits < item.instock ) {
            numbersOfUnits++;
          }
        }
        return {
          ...item,
          numberOfUnits : numbersOfUnits,
        };
  })
  updateCart()
}