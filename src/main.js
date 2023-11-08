// Elementos HTML por ID y almacena referencias en variables
const productGrid = document.getElementById('product-grid');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const clearButton = document.getElementById('clear-button');
const orderHistory = document.getElementById('order-history');

// Clase "Product" para representar productos
class Product {
  constructor(id, name, description, price, imageUrl) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }
  
    generateProductCard() {
      const card = document.createElement('div');
      card.classList.add('w-1/4', 'p-2', 'mb-4', 'mx-2');
    
      const cardContent = document.createElement('div');
      cardContent.classList.add('bg-white', 'rounded', 'shadow', 'p-4', 'product-card', 'hover:shadow-lg', 'transition', 'transform', 'hover:-translate-y-1');
    
      // Agregar la etiqueta 'img' para la imagen
      const image = document.createElement('img');
      image.classList.add('w-full', 'mb-2');
      image.src = this.imageUrl;
      image.alt = this.name;
    
      const content = document.createElement('div');
      content.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${this.name}</h2>
        <p class="mb-2 text-gray-600">Descripción del ${this.name}</p>
        <p class="mb-2 text-gray-600">${this.description}</p>
        <p class="text-emerald-700 font-semibold text-xl">$${this.price.toFixed(2)}</p>
        <button class="add-button bg-emerald-800 hover:bg-emerald-700 text-emerald-700 font-bold py-2 px-4 rounded mt-4">Agregar al carrito</button>
      `;
    
      cardContent.appendChild(image);
      cardContent.appendChild(content);
      card.appendChild(cardContent);
    
      const addButton = card.querySelector('.add-button');
      addButton.addEventListener('click', () => addToCart(this));
    
      return card;
    }
    
  }


// Clase "CartItem" para representar elementos del carrito
class CartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    generateCartItem() {
      const item = document.createElement('li');
      item.classList.add('cart-item');
      item.dataset.id = this.product.id;
      item.innerHTML = `<span>${this.product.name}</span><br>
        <span class="quantity">${this.quantity}</span><br>
        <button class="remove-button bg-red-500 hover-bg-red-700 text-white font-bold py-1 px-2 rounded">Eliminar</button>`;
  
      const removeButton = item.querySelector('.remove-button');
      removeButton.addEventListener('click', () => removeFromCart(this.product));
      return item;
    }
  }  

// Creamos una lista de productos
const products = [
  new Product('1', 'Bolsas biodegradables:', 'Si tienes mascotas, ¿has pensado en las bolsas que utilizas cuando lo sacas a pasear? Pues si no las conoces, te presentamos las bolsas biodegradables', 3.49, 'bolsas.jpeg'),

  new Product('2', 'Peine de bambú ecológico:', 'El interior de nuestras casas se suele ver invadido por el pelo de nuestros peques, y algo imprescindible para reducirlo es peinarlos con peines especiales. Has pensado en peines de bambú ecológico.', 16.70, 'cepillo.jpeg'),

  new Product('3', 'Cama para perros y gatos estilo Tipi:', 'Es importante que nuestros más peques se sientan a gusto, seguros y cómodos dentro de nuestras casas. En Huellitas tenemos nuestros diseños únicos de camas refugio en forma de Tipi para gatos y perros pequeños. Está fabricado con tela lavable y madera recuperada 100 %.', 64.50, 'camita gato.jpeg'),

  new Product('4', 'Jueguetes para morder-Perros:', 'El desarrollo de la dentadura y el desgaste de las uñas de nuestra mascota es algo fundamental en su vida. Necesitan tener juguetes para morder y arañar. Así que, en lugar de productos de plástico, ¿por qué no tener productos sostenibles y eco friendly?', 9.76, 'juguestes para morder perro.jpeg'),

  new Product('5', 'Juguetes para arañar-Gatos:', 'El desarrollo de la dentadura y el desgaste de las uñas de nuestra mascota es algo fundamental en su vida. Necesitan tener juguetes para morder y arañar. Así que, en lugar de productos de plástico, ¿por qué no tener productos sostenibles y eco friendly?', 10.70, 'juguestes para arañar gato.jpeg'),

  new Product('6', 'Comedero:', 'El comedero es un artículo de uso diario. ¿Has pensado en que esté hecho de materiales sostenibles? Nuestra propuesta para la familia Reviverdes se basa en un comedero hecho con madera recuperada y cuencos metálicos. Una opción sostenible y duradera en el tiempo. Además puedes personalizarlos con su nombre', 20.40, 'comidero.jpeg'),
];

const cart = [];
  
    // Agrega productos al carrito
function addToCart(product) {
  const cartItem = cart.find(item => item.product.id === product.id);

  if (cartItem) {
    // Si el producto ya está en el carrito, muestra un mensaje al usuario
    const addAgainProduct = window.confirm('Este producto ya está en el carrito. ¿Deseas agregarlo de nuevo?');

    if (addAgainProduct) {
      cartItem.quantity++;
    } else {
      cartItem.quantity 
    }
  } else {
    cart.push(new CartItem(product, 1));
  }

  updateCartView();
}

// Elimina productos del carrito
function removeFromCart(product) {
  const index = cart.findIndex(item => item.product.id === product.id);
  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }

    updateCartView();
  }
}

// Funcion vaciar carrito
function clearCart() {
  cart.length = 0;
  updateCartView();
}

// Procesador de la compra
function checkout() {
  if (cart.length === 0) {
    return;
  }

  const orderItems = [...cart];
  const orderTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const orderDate = new Date().toLocaleString();

  const order = new Order(orderItems, orderTotal, orderDate);
  orderHistory.appendChild(order.generateOrderElement());

  clearCart();
}

// Actualiza la vista del carrito
function updateCartView() {
  cartItems.innerHTML = '';
  cartTotal.textContent = '0';

  cart.forEach(cartItem => {
    cartItems.appendChild(cartItem.generateCartItem());
  });

  const total = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  cartTotal.textContent = total.toFixed(2);
}

// Clase "Order" para representar un pedido
class Order {
  constructor(items, total, date) {
    this.items = items;
    this.total = total;
    this.date = date;
  }

  generateOrderElement() {
    const orderElement = document.createElement('div');
    orderElement.classList.add('bg-white', 'rounded', 'p-4', 'shadow')

    orderElement.innerHTML = `
      <h3>Pedido realizado el ${this.date}</p>
      <p>
        ${this.items.map(item => `<li>${item.quantity} x ${item.product.name}</li>`).join('')}
      </p>
      <p>Total: $${this.total.toFixed(2)}</p>
    `;

    return orderElement;
  }
}

// Popula el grid de productos
products.forEach(product => {
  productGrid.appendChild(product.generateProductCard());
});

checkoutButton.addEventListener('click', checkout);
clearButton.addEventListener('click', clearCart);

