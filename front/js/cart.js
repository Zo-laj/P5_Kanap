let itemsData = [];

const fetchItems = async () => {
  const result = await fetch("http://localhost:3000/api/products");
  itemsData = await result.json();
};

const displayCart = async () => {
  await fetchItems();

  productsLocalStorage.forEach((cartItem) => {
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
};

displayCart();

function deleteProductFromCart() {
  document.querySelectorAll(".deleteItem").forEach((btn) => {
    const datasetId = btn.closest("article").getAttribute("data-id");
    const datasetColor = btn.closest("article").getAttribute("data-color");

    btn.addEventListener("click", () => {
      const newCart = productsLocalStorage.filter((product) => {
        return product.id !== datasetId && product.color != datasetColor;
      });
      console.log(productsLocalStorage);
      console.log(newCart);
      console.log(datasetColor);
      console.log(datasetId);

      productsLocalStorage = newCart;

      setCart(productsLocalStorage);
    });
  });
}
