let itemsData = [];

const fetchItems = async () => {
  const result = await fetch("http://localhost:3000/api/products");
  itemsData = await result.json();
};

const displayCart = async () => {
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
    clone.getElementById(
      "cartItemPrice"
    ).textContent = `${cartItemInfo.price} €`;
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
      Accept: "application/json",
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
    isValid(document.getElementById("firstNameErrorMsg").textContent) &&
    isValid(document.getElementById("lastNameErrorMsg").textContent) &&
    isValid(document.getElementById("addressErrorMsg").textContent) &&
    isValid(document.getElementById("cityErrorMsg").textContent) &&
    isValid(document.getElementById("emailErrorMsg").textContent) &&
    products.length != 0
  ) {
    sendOrder(order);
    localStorage.clear();
  }
});

function isNotEmpty(input) {
  return input != "" ? true : false;
}

function isValid(input) {
  return input == "" ? true : false;
}

document.getElementById("firstName").addEventListener("change", (e) => {
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  if (!/^[a-zA-ZÀ-ÿ-]*$/.test(e.target.value)) {
    firstNameErrorMsg.textContent =
      "Ne peut contenir de chiffres ni de caractères spéciaux";
  } else {
    firstNameErrorMsg.textContent = "";
  }
});

document.getElementById("lastName").addEventListener("change", (e) => {
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  if (!/^[a-zA-ZÀ-ÿ-]*$/.test(e.target.value)) {
    lastNameErrorMsg.textContent =
      "Ne peut contenir de chiffres ni de caractères spéciaux";
  } else {
    lastNameErrorMsg.textContent = "";
  }
});

document.getElementById("address").addEventListener("change", (e) => {
  const addressErrorMsg = document.getElementById("addressErrorMsg");
  if (!/^[a-zA-ZÀ-ÿ1-9- ]*$/.test(e.target.value)) {
    addressErrorMsg.textContent = "Ne peux contenir de caractères spéciaux";
  } else {
    addressErrorMsg.textContent = "";
  }
});

document.getElementById("city").addEventListener("change", (e) => {
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  if (!/^[a-zA-ZÀ-ÿ- ]*$/.test(e.target.value)) {
    cityErrorMsg.textContent =
      "Ne peux contenir de chiffre ni de caractères spéciaux";
  } else {
    cityErrorMsg.textContent = "";
  }
});

document.getElementById("email").addEventListener("change", (e) => {
  const emailErrorMsg = document.getElementById("emailErrorMsg");
  if (!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,5})$/.test(e.target.value)) {
    emailErrorMsg.textContent = "Format de l'adresse mail invalide";
  } else {
    emailErrorMsg.textContent = "";
  }
});
