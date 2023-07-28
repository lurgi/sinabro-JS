import test from "./test.json?raw";

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

const countObj = {};

function getProductHTML(product, count = 0) {
  return `<div class="product" data-product-id="${product.id}">
      <img src="${product.images[0]}" alt="${product.id}"/>
      <p>${product.name}</p>
      <div class="flex justify-between items-center">
        <p>Price : ${product.regularPrice}$</p>
        <div class="flex gap-2">
          <button class="btn-decrease hover:bg-green-300 transition bg-green-100 rounded-full w-6 h-6 flex justify-center items-center">-</button>
          <p class="cart-count">${count === 0 ? "" : count}</p>
          <button class="btn-increase hover:bg-green-300 transition bg-green-100 rounded-full w-6 h-6 flex justify-center items-center">+</button>
        </div>
      </div>
    </div>`;
}

function countCartCount() {
  return Object.values(countObj).reduce((acc, cur) => acc + cur, 0);
}

function findElement(startingElement, seletor) {
  let currentElement = startingElement;
  while (currentElement) {
    if (currentElement.matches(seletor)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return null;
}

async function main() {
  const products = await getProducts();
  const productMap = {};
  products.forEach((product) => {
    productMap[product.id] = product;
  });

  document.querySelector("#products").innerHTML = products
    .map((product, index) => getProductHTML(product))
    .join("");

  const updateCart = () => {
    const totalCount = document.querySelector(".total_cart_count");
    totalCount.innerHTML = `(${countCartCount()})`;
    const productIdsInCart = Object.keys(countObj);
    document.querySelector(".cart_items").innerHTML = productIdsInCart
      .map((productId) => {
        const productInCart = productMap[productId];
        if (countObj[productId] === 0) return "";
        return getProductHTML(productInCart, countObj[productId]);
      })
      .join("");
  };

  const updateProductCount = (productId) => {
    const productElement = document.querySelector(
      `.product[data-product-id="${productId}"]`
    );
    const cartCount = productElement.querySelector(".cart-count");
    if (countObj[productId] === 0) cartCount.innerHTML = "";
    else cartCount.innerHTML = countObj[productId];
    updateCart();
  };

  const increaseCount = (productId) => {
    if (countObj[productId] === undefined) {
      countObj[productId] = 0;
    }
    countObj[productId] += 1;
    updateProductCount(productId);
  };
  const decreaseCount = (productId) => {
    if (countObj[productId] === undefined) {
      countObj[productId] = 0;
    }
    countObj[productId] -= 1;
    updateProductCount(productId);
  };

  document.querySelector(".cart_btn").addEventListener("click", () => {
    document.querySelector("#cart-layer").classList.remove("hidden");
    document.querySelector("body").classList.add("cart_display");
  });
  document.querySelector(".cart_close_btn").addEventListener("click", () => {
    document.querySelector("#cart-layer").classList.add("hidden");
    document.querySelector("body").classList.remove("cart_display");
  });

  document.querySelector("#products").addEventListener("click", (event) => {
    const targetElement = event.target;
    const productElement = findElement(targetElement, ".product");
    const productId = productElement.getAttribute("data-product-id");
    if (
      targetElement.matches(".btn-decrease") ||
      targetElement.matches(".btn-increase")
    ) {
      if (targetElement.matches(".btn-decrease")) {
        decreaseCount(productId);
      } else if (targetElement.matches(".btn-increase")) {
        increaseCount(productId);
      }
    }
  });

  document.querySelector(".cart_items").addEventListener("click", (event) => {
    const targetElement = event.target;
    const productElement = findElement(targetElement, ".product");
    const productId = productElement.getAttribute("data-product-id");
    if (
      targetElement.matches(".btn-decrease") ||
      targetElement.matches(".btn-increase")
    ) {
      if (targetElement.matches(".btn-decrease")) {
        decreaseCount(productId);
      } else if (targetElement.matches(".btn-increase")) {
        increaseCount(productId);
      }
    }
  });
}

main();
