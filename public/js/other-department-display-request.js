const searchInput = document.getElementById("search-input");
const dropdownContent = document.querySelector(".dropdown-content");

searchInput.addEventListener("click", function () {
  dropdownContent.style.display = "block";
});

document.getElementById("search-input").addEventListener("input", function () {
  var value = this.value.toLowerCase();
  var dropdownItems = document.getElementsByClassName("dropdown-item");
  Array.prototype.forEach.call(dropdownItems, function (item) {
    var text = item.textContent.toLowerCase();
    if (text.indexOf(value) !== -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

const form = document.querySelector("#myForm");

const dropdownItems = document.querySelectorAll(".dropdown-item");
let categories = [];

dropdownItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault(); // prevent default form submission behavior
    searchInput.value = this.textContent;
    dropdownContent.style.display = "none";
    const searchValue = searchInput.value.trim();
    if (searchValue) {
      fetch("/other-department-add-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: searchValue }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const product = Object.values(data);
          const result = product.map((innerArray) => {
            return innerArray.reduce((acc, curr) => {
              return { ...acc, ...curr };
            }, {});
          });
          categories = [
            ...new Set(
              result.map((item) => {
                return {
                  ...item,
                  quantity: 0, // Set the quantity to 0 for each item
                };
              })
            ),
          ];
          let i = 0;
          document.getElementById("root").innerHTML = categories
            .map((item, i) => {
              var { image, item_name, unit, quantity } = item;
              return `
              <style>
              .form-group {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
              }
              
              .form-group label {
                width: 70px;
                margin-right: 0px;
                text-align: left;
              }
              
              .form-group input {
                flex: 0.5;
                padding: 5px;
              }
            </style>
            <div class='box'>
            <div class='img-box'>
                <img class='images' src="/img/items/${image}" required/>
            </div>
            <div class='bottom'>
            <div class="form-group">
            <label for="name">Name:</label>
            <input name="itemName" value="${item_name}" onchange='updateItemName(${i}, this.value)' readonly>
            </div>

            <div class="form-group">
            <label for="unit">Unit:</label>
            <input name="unit" value="${unit}" onchange='updateUnit(${i}, this.value)' readonly>
            </div>
               
            <div class="form-group">
            <label for="quantity"> Quantity:</label>
            <input name="quantity" value="${
              quantity ? quantity : 0
            }" onchange='updateQuantity(${i}, this.value)' required>
             </div>
             <button onclick='addtocart(${i})'>Add to cart</button>        
            </div>
          </div>`;
            })
            .join("");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
});

var cart = [];

function addtocart(a) {
  const existingItemIndex = cart.findIndex(
    (item) => item.item_name === categories[a].item_name
  );
  const quantityValue = categories[a].quantity;

  // Check if the quantity is NaN or undefined
  if (isNaN(quantityValue) || quantityValue === undefined) {
    alert("Please enter a valid quantity.");
    return;
  }

  if (quantityValue === 0) {
    alert("Please enter a quantity greater than zero.");
    return;
  }

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity =
      parseInt(cart[existingItemIndex].quantity) + parseInt(quantityValue);
  } else {
    cart.push({ ...categories[a] });
  }
  displaycart();
}

function updateItemName(index, value) {
  console.log(index);
  categories[index].item_name = value;
}

function updateUnit(index, value) {
  categories[index].unit = value;
}

function updateQuantity(index, value) {
  categories[index].quantity = value;
}

function delElement(a) {
  cart.splice(a, 1);
  displaycart();
}

function displaycart() {
  let j = 0;
  if (cart.length == 0) {
    document.getElementById("cartItem").innerHTML = "Your cart is empty";
  } else {
    document.getElementById("cartItem").innerHTML = cart
      .map((items) => {
        var { image, item_name, unit, quantity } = items;
        return `<div class='cart-item'>
      <div class='row-img'>
      <img class='rowimg' src="/img/items/${image}"/>
      </div> 
      <h2 style='font-size:15px;'>${item_name}</h2>
      <h2 style='font-size:15px;'> ${unit}</h2>
      <h2 style='font-size:15px;'> ${quantity}</h2>
      <img style = 'cursor:pointer' src = "assets/img/icons/delete.svg" onclick='delElement(${j++})'/>
    </div>`;
      })
      .join("");
  }
}

const saveCartButton = document.getElementById("saveCartButton");
saveCartButton.addEventListener("click", () => {
  fetch("/other-department-cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/other-department-add-request";
      } else {
        throw new Error("Failed to save cart items");
      }
    })
    .catch((error) => console.error(error));
});

displaycart();
