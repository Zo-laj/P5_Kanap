const template = document.getElementById("productTemplate");
const itemSection = document.querySelector(".item");

let product = [];

const id = new URL(window.location.href).searchParams.get("id");

const fetchProduct = async () => {
  await fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => (product = data));
};

const productDisplay = async () => {
  await fetchProduct();

  const clone = document.importNode(template.content, true);

  clone.querySelector("img").setAttribute("src", product.imageUrl);
  clone.querySelector("img").setAttribute("alt", product.altTxt);
  clone.getElementById("title").textContent = product.name;
  clone.getElementById("price").textContent = product.price;
  clone.getElementById("description").textContent = product.description;

  itemSection.appendChild(clone);

  product.colors.forEach((color) => {
    const colorOption = document.createElement("option");

    colorOption.setAttribute("value", color);
    colorOption.textContent = color;

    document.getElementById("colors").appendChild(colorOption);
  });
};

productDisplay();
