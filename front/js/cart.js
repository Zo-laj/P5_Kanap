let itemsData = [];

async function fetchItems() {
  const result = await fetch("http://localhost:3000/api/products");
  itemsData = await result.json();
};

async function displayCart() {
  await fetchItems();

  JSON.parse(localStorage.getItem(CART_KEY))?.map((cartItem) => {
    const clone = document.importNode(
      document.querySelector("#cartTemplate").content,
      true
    );
    const cartItemInfo = itemsData.find(
      (product) => product._id == cartItem.id
    );

    clone.querySelector(".cart__item").setAttribute("data-id", cartItem.id);
    clone
      .querySelector(".cart__item")
      .setAttribute("data-color", cartItem.color);
    clone.querySelector("img").setAttribute("src", cartItemInfo.imageUrl);
    clone.querySelector("img").setAttribute("alt", cartItemInfo.altTxt);
    clone.getElementById("cartItemName").textContent = cartItemInfo.name;
    clone.getElementById("cartItemColor").textContent = cartItem.color;
    clone.getElementById("cartItemPrice").textContent = `${cartItemInfo.price} €`;
    clone.querySelector("input").setAttribute("value", cartItem.quantity);

    document.getElementById("cart__items").appendChild(clone);
  });

  modifyProductQuantity();
  deleteProductFromCart();
  totalPriceAndQuantity();
};

displayCart();

function totalPriceAndQuantity()  {
  let totalQuantity = 0;
  let totalPrice = 0;

  JSON.parse(localStorage.getItem(CART_KEY))?.forEach((cartItem) => {
    const itemInfo = itemsData.find((product) => product._id == cartItem.id);
    totalQuantity += cartItem.quantity;
    totalPrice += cartItem.quantity * itemInfo.price;
  });

  document.getElementById("totalQuantity").textContent = totalQuantity;
  document.getElementById("totalPrice").textContent = totalPrice.toLocaleString();
};

//--------------------------------Form Control-----------------------------------------------


function sendOrder(order) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((order) => {
      window.location = "./confirmation.html?orderId=" + order.orderId;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.getElementById("order").addEventListener("click", (e) => {
  e.preventDefault();
  let products = [];

  JSON.parse(localStorage.getItem(CART_KEY))?.forEach((el) => {
    products.push(el.id);
  });

  const order = {
    contact: {
      firstName: document.getElementById("firstName")?.value,
      lastName: document.getElementById("lastName")?.value,
      address: document.getElementById("address")?.value,
      city: document.getElementById("city")?.value,
      email: document.getElementById("email")?.value,
    },
    products,
  };

  if (
    isNotEmpty(order.contact.firstName) &&
    isNotEmpty(order.contact.lastName) &&
    isNotEmpty(order.contact.address) &&
    isNotEmpty(order.contact.city) &&
    isNotEmpty(order.contact.email) &&
    products.length != 0
  ) {
    sendOrder(order);
    localStorage.clear();
  }
});

function isNotEmpty(input) {
  return input != "";
}

[
  {key: "firstName", regex: /^[a-zA-ZÀ-ÿ- ]*$/},
  {key: "lastName", regex: /^[a-zA-ZÀ-ÿ- ]*$/},
  {key: "address", regex: /^[a-zA-ZÀ-ÿ1-9- ]*$/},
  {key: "city", regex: /^[a-zA-ZÀ-ÿ- ]*$/},
  {key: "email", regex: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,5})$/}

].forEach((input) => {
  document.getElementById(input.key).addEventListener("change", (e) => {
    const errorMsg = document.getElementById(`${input.key}ErrorMsg`);
    const orderBtn = document.getElementById("order");
    orderBtn.disabled = true

    if (!input.regex.test(e.target.value)) {
      if(input.key == "email") {
        errorMsg.textContent = "format de l'adresse email invalide"
      } else if (input.key == "address") {
        errorMsg.textContent = "Ne peut contenir de caractère spéciaux"
      } else {
        errorMsg.textContent =
          "Ne peut contenir de chiffres ni de caractères spéciaux";
      }

    } else if (e.target.value == "" || e.target.value == null) {
      errorMsg.textContent = "Veuillez remplir ce champ";

    } else {
      errorMsg.textContent = "";
      orderBtn.disabled = false;
    }
  });
})

