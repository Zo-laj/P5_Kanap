// import { addProductToCart } from "./local-storage";

const id = new URL(window.location.href).searchParams.get("id");

let product = [];

const fetchProduct = async () => {
  const result = await fetch("http://localhost:3000/api/products/" + id);
  product = await result.json();
};

const productDisplay = async () => {
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

// document
//   .getElementById("addToCart")
//   .addEventListener("click", () =>
//     addProductToCart(
//       id,
//       document.getElementById("colors")?.value,
//       document.getElementById("quantity")?.value
//     )
//   );
