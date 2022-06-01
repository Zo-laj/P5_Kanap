const id = new URL(window.location.href).searchParams.get("id");
let product = [];


// Récupère les données du produit
async function fetchProduct() {
  const result = await fetch("http://localhost:3000/api/products/" + id);
  product = await result.json();
};

// Affiche le produit
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

// Ajoute le produit dans le local storage
document.getElementById("addToCart").addEventListener("click", () => {
  if (document.getElementById("colors").value == "") {
    alert("veuillez choisir une couleur");

  } else if (document.getElementById("quantity").value == "0" || +document.getElementById("quantity").value > 100) {
    alert("veuillez choisir une quantité de produit entre 1 et 100");

  } else {
    addProductToCart(
      id,
      document.getElementById("colors")?.value,
      +document.getElementById("quantity")?.value
    );
    window.location.assign("./cart.html");
  }
});
