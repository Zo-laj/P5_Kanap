const CART_KEY = "cart";

// export function addProductToCart(id, color, quantity) {
//   localStorage.setItem(
//     CART_KEY,
//     JSON.stringify([
//       {
//         id,
//         quantity,
//         color,
//       },
//     ])
//   );
// }

function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY));
}

function addProductToCart(id, color, quantity) {
  let cart = getCart();

  if (cart) {
    let existingItem = cart.find(
      (item) => item.id == id && item.color == color
    );

    if (existingItem != undefined) {
      existingItem.quantity = Number(existingItem.quantity) + Number(quantity);
    } else {
      cart.push({
        id,
        color,
        quantity,
      });
    }

    setCart(cart);
  } else {
    localStorage.setItem(CART_KEY, JSON.stringify([{ id, color, quantity }]));
  }
}
