let itemsData = [];

const fetchItems = async () => {
  const result = await fetch("http://localhost:3000/api/products");
  itemsData = await result.json();
};

const displayCart = async (cart) => {
  await fetchItems();

  cart.map((cartItem) => {
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
  deleteProductFromCart();
  TotalPriceAndQuantity(productsLocalStorage);
};

displayCart(productsLocalStorage);

function deleteProductFromCart() {
  document.querySelectorAll(".deleteItem").forEach((btn) => {
    btn.addEventListener("click", () => {
      const newCart = productsLocalStorage.filter((product) => {
        return (
          product.id !== btn.closest("article").getAttribute("data-id") &&
          product.color != btn.closest("article").getAttribute("data-color")
        );
      });

      console.log(productsLocalStorage);
      console.log(newCart);

      setCart(newCart);
      displayCart(newCart);
    });
  });
}

const TotalPriceAndQuantity = async (cart) => {
  await fetchItems();

  let totalQuantity = 0;
  let totalPrice = 0;

  cart.forEach((cartItem) => {
    const itemInfo = itemsData.find((product) => product._id == cartItem.id);
    totalQuantity = totalQuantity + Number(cartItem.quantity);
    totalPrice = totalPrice + Number(cartItem.quantity) * itemInfo.price;
  });

  document.getElementById("totalQuantity").textContent = totalQuantity;
  document.getElementById("totalPrice").textContent = totalPrice;
};
