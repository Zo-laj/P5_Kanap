const itemImg = document.getElementById("itemImg");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");

let product = [];

var url = new URL(window.location.href);
var id = url.searchParams.get("id");

const fetchProduct = async () => {
  await fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((data) => (product = data));
};

const productDisplay = async () => {
  await fetchProduct();

  let color = "";

  product.colors.forEach((element) => {
    color += `
      <option value="${element}">${element}</option>
      `;
  });

  itemImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  title.innerHTML = product.name;
  price.innerHTML = product.price;
  description.innerHTML = product.description;
  colors.innerHTML = color;
};

productDisplay();
