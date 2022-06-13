let items = [];

/**
 * Get items data using fetch API
 * @return { Promise } 
 */
async function fetchItems() {
  const result = await fetch("http://localhost:3000/api/products");
  items = await result.json();
};

/**
 * Display dynamically the fetch items by cloning a template
 * @param { Array.<Object> } items
 */
async function displayItems() {
  await fetchItems();
  
  const template = document.querySelector("#productsTemplate");
  const itemsSection = document.querySelector("#items");

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
