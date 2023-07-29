import test from "./test.json?raw";

export function getProductElement(product, count = 0) {
  const element = document.createElement("div");
  element.classList.add("product");
  element.setAttribute("data-product-id", product.id);
  element.innerHTML = `<img src="${product.images[0]}" alt="${product.id}"/>
      <p>${product.name}</p>
      <div class="flex justify-between items-center">
        <p>Price : ${product.regularPrice}$</p>
        <div class="flex gap-2">
          <button class="btn-decrease hover:bg-green-300 transition bg-green-100 rounded-full w-6 h-6 flex justify-center items-center">-</button>
          <p class="cart-count">${count === 0 ? "" : count}</p>
          <button class="btn-increase hover:bg-green-300 transition bg-green-100 rounded-full w-6 h-6 flex justify-center items-center">+</button>
        </div>
      </div>`;
  return element;
}

async function getProducts() {
  if (process.env.NODE_ENV === "development") {
    return JSON.parse(test);
  } else {
    const products = await (
      await fetch("https://learnwitheunjae.dev/api/sinabro-js/ecommerce")
    ).then((response) => response.json());
    return products;
  }
}

export async function setupProducts({ container }) {
  const products = await getProducts();
  const productMap = {};
  products.forEach((product) => {
    productMap[product.id] = product;
  });

  products.forEach((product) => {
    const productElement = getProductElement(product);
    container.appendChild(productElement);
  });

  const updateCount = ({ productId, count }) => {
    const productElement = container.querySelector(
      `.product[data-product-id="${productId}"]`
    );
    const cartCount = productElement.querySelector(".cart-count");
    if (count === 0) cartCount.innerHTML = "";
    else cartCount.innerHTML = count;
  };

  const productById = (productId) => {
    return productMap[productId];
  };

  return { updateCount, productById };
}
