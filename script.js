// Function to fetch the product data from the API
async function fetchProductData() {
  try {
    const response = await fetch(
      "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

// Function to create a product card element
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const image = document.createElement("img");
  image.src = product.product_image;
  image.alt = product.product_title;
  card.appendChild(image);

  const title = document.createElement("h1");
  title.textContent = product.product_title;
  card.appendChild(title);

  const variants = document.createElement("p");
variants.classList.add("product-variants");

  product.product_variants.forEach((variant) => {
    const variantValues = Object.values(variant).map((value) =>
      value.toUpperCase()
    );
    const variantSpan = document.createElement("span");
    variantSpan.innerHTML = variantValues.join("/");
    variants.appendChild(variantSpan);
    variants.appendChild(document.createElement("br"));
  });
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = product.product_badge;

  card.appendChild(badge);
  card.appendChild(variants);

  return card;
}

// Function to display the product cards on the page
function displayProductCards(products) {
  const container = document.querySelector(".api-content");
  container.innerHTML = "";

  products.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

// Function to handle the search functionality
function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const title = card.querySelector("h1");
    const variants = card.querySelector("p");
    const titleText = title.textContent;
    const variantsText = variants.textContent;

    const markedTitle = markText(titleText, searchTerm);
    const markedVariants = markText(variantsText, searchTerm);

    title.innerHTML = markedTitle;
    variants.innerHTML = markedVariants;
  });
}

// Function to mark the matching text within the given string
function markText(text, searchTerm) {
    const regex = new RegExp(searchTerm, "gi");
    const markedText = text.replace(
      regex,
      (match) => `<span class="marked-text">${match}</span>`
    );
    
    return markedText.replace(/\n/g, "<br>");
  }

// Function to handle the layout switch
function handleLayoutSwitch(event) {
  const layout = event.target.dataset.layout;
  const apiContent = document.querySelector(".api-content");

  apiContent.classList.remove("list-layout", "grid-layout");
  apiContent.classList.add(layout + "-layout");
}

// Fetch the product data and display the cards
fetchProductData().then((data) => {
  if (data && Array.isArray(data.data)) {
    displayProductCards(data.data);
  }
});

// Event listeners
const searchBox = document.getElementById("search-box");
searchBox.addEventListener("input", handleSearch);

const layoutIcons = document.querySelectorAll(".layout-icon");
layoutIcons.forEach((icon) => {
  icon.addEventListener("click", handleLayoutSwitch);
});
