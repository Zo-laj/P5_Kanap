const CART_KEY = "cart";

/**
 * Set a new cart in the local storage
 * @param { Array } cart 
 */
function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * Add new object to the cart / update quantity if same existing object 
 * @param { String } id 
 * @param { String } color 
 * @param { String } quantity
 * @returns { Array.<Object> } 
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
 * @param { HTMLElement } btn
 * @returns { Array.<Object> } 
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
 * @param { HTMLElement } btn
 * @returns { Array.<Object> } 
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
      
      if (+e.target.value <= 0 || +e.target.value > 100) {
        alert('Veuillez saisir une quantit?? comprise entre 1 et 100');
        e.target.value = 1
      }

      newProductQuantity.quantity = +e.target.value;
      setCart(productsLocalStorage);
      totalPriceAndQuantity();
    });
  });
}


