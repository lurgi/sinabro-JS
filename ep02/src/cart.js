import { getProductElement } from "./products";

export function setupCart({ container, countObj }) {
  function countCartCount() {
    return Object.values(countObj).reduce((acc, cur) => acc + cur, 0);
  }

  const totalCount = document.querySelector(".total_cart_count");

  const addProduct = ({ product, count }) => {
    totalCount.innerHTML = `(${countCartCount()})`;
    const productElement = getProductElement(product, count);
    container.appendChild(productElement);
  };

  const removeProduct = ({ product }) => {
    totalCount.innerHTML = `(${countCartCount()})`;
    const productElement = container.querySelector(
      `.product[data-product-id="${product.id}"]`
    );
    productElement.remove();
  };
  const updateCart = ({ productId, count }) => {
    totalCount.innerHTML = `(${countCartCount()})`;
  };

  return { addProduct, removeProduct, updateCart };
}
