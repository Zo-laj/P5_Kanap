const template = document.querySelector("#cartTemplate");
const cartItemsSection = document.getElementById("cart__items");

let itemsData = [];

const fetchItems = async () => {
  const result = await fetch("http://localhost:3000/api/products");
  itemsData = await result.json();
};

const displayCart = async () => {
  await fetchItems();

  let cart = getCart();

  cart.forEach((cartItem) => {
    const clone = document.importNode(template.content, true);
    const cartItemInfo = itemsData.find(
      (product) => product._id == cartItem.id
    );
    console.log(cartItemInfo);

    clone.querySelector("img").setAttribute("src", cartItemInfo.imageUrl);
    clone.querySelector("img").setAttribute("alt", cartItemInfo.altTxt);
    clone.querySelector(".cart__item").setAttribute("data-id", cartItem.id);
    clone
      .querySelector(".cart__item")
      .setAttribute("data-color", cartItem.color);
    clone.getElementById("cartItemName").textContent = cartItemInfo.name;
    clone.getElementById("cartItemColor").textContent = cartItem.color;
    clone.getElementById(
      "cartItemPrice"
    ).textContent = `${cartItemInfo.price} €`;
    clone.querySelector("input").setAttribute("value", cartItem.quantity);

    cartItemsSection.appendChild(clone);
  });
};

displayCart();
