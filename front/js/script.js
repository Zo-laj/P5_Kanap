const itemsSection = document.getElementById("items");

let items = [];

//ajouter try / catch

const fetchItems = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (items = data));
};

const itemsDisplay = async () => {
  await fetchItems();

  itemsSection.innerHTML = items
    .map(
      (item) =>
        `
          <a href="./product.html?id=${item._id}">
              <article>
                <img src=${item.imageUrl} alt=${item.altTxt}>
                <h3 class="productName">${item.name}</h3>
                <p class="productDescription">${item.description}</p>
              </article>
            </a>
        `
    )
    .join(" ");
};

itemsDisplay();
