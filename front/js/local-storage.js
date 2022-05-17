const CART_KEY = "cart";

function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

let productsLocalStorage = JSON.parse(localStorage.getItem(CART_KEY));

function addProductToCart(id, color, quantity) {
  if (productsLocalStorage) {
    let existingItem = productsLocalStorage.find(
      (item) => item.id == id && item.color == color
    );

    if (existingItem != undefined) {
      existingItem.quantity = Number(existingItem.quantity) + Number(quantity);
    } else {
      productsLocalStorage.push({
        id,
        color,
        quantity,
      });
    }

    setCart(productsLocalStorage);
  } else {
    localStorage.setItem(CART_KEY, JSON.stringify([{ id, color, quantity }]));
  }
}
