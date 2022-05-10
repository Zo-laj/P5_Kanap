const template = document.querySelector("#productsTemplate");
const itemsSection = document.querySelector("#items");

let items = [];

const fetchItems = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (items = data));
};

const displayItems = async () => {
  await fetchItems();

  items.forEach((item) => {
    const clone = document.importNode(template.content, true);

    clone
      .querySelector("a")
      .setAttribute("href", `./product.html?id=${item._id}`);

    clone.querySelector("img").setAttribute("src", item.imageUrl);
    clone.querySelector("img").setAttribute("alt", item.altTxt);
    clone.querySelector(".productName").textContent = item.name;
    clone.querySelector(".productDescription").textContent = item.description;

    itemsSection.appendChild(clone);
  });
};

displayItems();
