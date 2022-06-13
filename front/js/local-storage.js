const CART_KEY = "cart";

/**
 * Set a new cart in the local storage
 * @param { Array.<Object> } cart 
 */
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * Add new object to the cart / update quantity if same existing object 
 * @param { String } id 
 * @param { String } color 
 * @param { String } quantity 
 */
function addProductToCart(id, color, quantity) {
  const productsLocalStorage = JSON.parse(localStorage.getItem(CART_KEY));

  if (productsLocalStorage) {
    let existingItem = productsLocalStorage.find(
      (item) => item.id == id && item.color == color
    );

    if (existingItem != null) {
      existingItem.quantity += quantity;
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

/**
 * Delete product from the cart on click
 */
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

/**
 * Update the product quantity on change event 
 */
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
      
      if (+e.target.value == 0 || +e.target.value > 100) {
        alert('Veuillez saisir une quantité comprise entre 1 et 100');

      } else {
        setCart(productsLocalStorage);
        totalPriceAndQuantity();
      }
    });
  });
}


