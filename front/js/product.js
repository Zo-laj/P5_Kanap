const id = new URL(window.location.href).searchParams.get("id");
let product = [];

/**
 * Get the selected item data using fetch API
 * @return { Promise } 
 */
async function fetchProduct() {
  const result = await fetch("http://localhost:3000/api/products/" + id);
  product = await result.json();
};

/**
 * Display the fetch item 
 * @param { Object } product
 */
async function productDisplay() {
  await fetchProduct();

  document.getElementById("itemImg").setAttribute("src", product.imageUrl);
  document.getElementById("itemImg").setAttribute("alt", product.altTxt);
  document.getElementById("title").textContent = product.name;
  document.getElementById("price").textContent = product.price;
  document.getElementById("description").textContent = product.description;

  product.colors.forEach((color) => {
    const colorOption = document.createElement("option");

    colorOption.setAttribute("value", color);
    colorOption.textContent = color;

    document.getElementById("colors").appendChild(colorOption);
  });
};

productDisplay();

/**
 * On click, store the selected item in local storage
 * @param { String } id
 * @param { String } color
 * @param { Number } quantity
 */
document.getElementById("addToCart").addEventListener("click", () => {
  const color = document.getElementById("colors").value;
  const quantity = +document.getElementById("quantity").value;

  if (color == "") {
    alert("veuillez choisir une couleur");

  } else if (quantity <= 0 || quantity > 100) {
    alert("veuillez choisir une quantité de produit entre 1 et 100");

  } else {
    addProductToCart(
      id,
      color,
      quantity
    );
    //window.location.assign("./cart.html");
  }
});
