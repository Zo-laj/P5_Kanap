const itemsSection = document.getElementById("items");

let items = [];

const fetchItems = async () =>
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => (items = data));

/*const fetchItems = fetch("http://localhost:3000/api/products");
const fetchResponse = new Response(fetchItems);
fetchResponse.responseType = "json";
items += fetchResponse;*/

const itemsDisplay = async () => {
  await fetchItems();

  console.log(items);

  const template = document.querySelector("#productsTemplate");
  const itemsSection = document.querySelector("#items");

  console.log(template);

  const clone = document.importNode(template.content, true);

  clone
    .querySelector("a")
    .setAttribute("href", `./product.html?id=${items[0]._id}`);

  clone.querySelector("img").setAttribute("src", items[0].imageUrl);
  clone.querySelector("img").setAttribute("alt", items[0].altTxt);

  clone.querySelector(".productName").textContent = items[0].name;

  clone.querySelector(".productDescription").textContent = items[0].description;

  itemsSection.appendChild(clone);

  /*itemsSection.innerHTML = items
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
    .join(" ");*/
};

itemsDisplay();
