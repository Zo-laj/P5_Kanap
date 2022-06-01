let itemsData = [];

// Récupère les données de l'api
async function fetchItems() {
  const result = await fetch("http://localhost:3000/api/products");
  itemsData = await result.json();
};

// Affiche le panier
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

// Prix et quantité total du panier
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


// Envoi la commande 
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

//Contrôle panier et formulaire puis envoi la commande
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

  if (products.length == 0) {
    alert("le panier est vide")
  } else if (isEmpty(order.contact.firstName) ||
    isEmpty(order.contact.lastName) ||
    isEmpty(order.contact.address) ||
    isEmpty(order.contact.city) ||
    isEmpty(order.contact.email) )
  {
    alert("Le formulaire est incomplet") 
  }
   else {
    sendOrder(order);
    //localStorage.clear();
  }
});

// Vérifie si les champs du formulaire sont remplis
function isEmpty(input) {
  return input == "";
}

//Contrôle la validité des entrées du formulaire
[
  {key: "firstName", regex: /^[^-\s][a-zA-ZÀ-ÿ- ]{2,}$/},
  {key: "lastName", regex: /^[^-\s][a-zA-ZÀ-ÿ- ]{2,}$/},
  {key: "address", regex: /^[^-\s][a-zA-ZÀ-ÿ1-9- ]*$/},
  {key: "city", regex: /^[^-\s][a-zA-ZÀ-ÿ- ]{2,}$/},
  {key: "email", regex: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,5})$/}

].forEach((input) => {
  document.getElementById(input.key).addEventListener("change", (e) => {
    const errorMsg = document.getElementById(`${input.key}ErrorMsg`);
    const orderBtn = document.getElementById("order");
    orderBtn.disabled = true;

    if (!input.regex.test(e.target.value)) {
      if(input.key == "email") {
        errorMsg.textContent = "format de l'adresse email invalide"
      } else if (input.key == "address") {
        errorMsg.textContent = "Ne peut contenir de caractère spéciaux"
      } else {
        errorMsg.textContent =
          "Ne peut contenir de chiffres ni de caractères spéciaux. Doit contenir au moins 3 caractères";
      }

    } else if (e.target.value == "" || e.target.value == null) {
      errorMsg.textContent = "Veuillez remplir ce champ";

    } else {
      errorMsg.textContent = "";
      orderBtn.disabled = false;
    }
  });
})

