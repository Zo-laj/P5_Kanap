const CART_KEY = "cart";

function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addProductToCart(id, color, quantity) {
  const productsLocalStorage = JSON.parse(localStorage.getItem(CART_KEY));

  if (productsLocalStorage) {
    let existingItem = productsLocalStorage.find(
      (item) => item.id == id && item.color == color
    );

    if (existingItem != null) {
      existingItem.quantity = existingItem.quantity + quantity;
    } else {
      productsLocalStorage.push({
        id,
        color,
        quantity,
      });
    }
    setCart(productsLocalStorage);

  } else {
    setCart([{ id, color, quantity }]);
  }
}

function deleteProductFromCart() {
  document.querySelectorAll(".deleteItem").forEach((btn) => {
    btn.addEventListener("click", () => {
      const newCart = JSON.parse(localStorage.getItem(CART_KEY)).filter(
        (product) =>
          product.id !== btn.closest("article").getAttribute("data-id") ||
          product.color !== btn.closest("article").getAttribute("data-color")
      );

      setCart(newCart);
      btn.closest("article").remove();
      totalPriceAndQuantity();
    });
  });
}

function modifyProductQuantity() {
  document.querySelectorAll(".itemQuantity").forEach((btn) => {

    btn.addEventListener("change", (e) => {
      const productsLocalStorage = JSON.parse(localStorage.getItem(CART_KEY))

      let newProductQuantity = productsLocalStorage.find(
        (product) => 
        product.id === btn.closest("article").getAttribute("data-id") && 
        product.color === btn.closest("article").getAttribute("data-color")
      );

      newProductQuantity.quantity = +e.target.value

      setCart(productsLocalStorage);
      totalPriceAndQuantity();
    });
  });
}


