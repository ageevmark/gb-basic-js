'use strict';

const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');

// Обработчик открытия корзины
document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

// {id: $, name: $, price: $, count: $}
const basket = {};

// Обработчик добавления в корзину
document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCart(id, name, price);
});

/**
 * Функция добавления товара в корзину.
 * @param {number} id - id продукта
 * @param {string} name - название продукта
 * @param {number} price - цена продукта
 */
function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id: id, name: name, price: price, count: 0 };
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount().toString();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

/**
 * Счетчик товаров в корзине.
 * @return {number} - количество товаров в корзине.
 */
function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

/**
 * Считает и возвращает итоговую стоимость товаров в корзине.
 * @return {number} - Стоимость товаров в корзине
 */
function getTotalBasketPrice() {
    return Object
        .values(basket)
        .reduce((acc, product) => acc + product.price * product.count, 0);
}

/**
 * Отрисовывает инфо о продукте в корзине.
 * @param {number} productId - Id продукта
 */
function renderProductInBasket(productId) {
    const basketRowEl = basketEl
        .querySelector(`.basketRow[data-id="${productId}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(productId);
        return;
    }

    const product = basket[productId];
    basketRowEl.querySelector('.productCount').textContent = product.count;
    basketRowEl
        .querySelector('.productTotalRow')
        .textContent = (product.price * product.count).toFixed(2);
}

/**
 * Отрисовывает новый товар в корзине.
 * @param {number} productId - Id товара
 */
function renderNewProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}