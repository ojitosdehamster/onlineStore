// Elementos HTML por ID y almacena referencias en variables
const productGrid = document.getElementById('product-grid');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const clearButton = document.getElementById('clear-button');
const orderHistory = document.getElementById('order-history');

// Clase "Product" para representar productos
class Product {
    constructor(id, name, price, imageUrl) {
      this.id = id;
      this.name = name;
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
        <p class="text-blue-600 font-semibold text-xl">$${this.price.toFixed(2)}</p>
        <button class="add-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Agregar al carrito</button>
      `;
    
      cardContent.appendChild(image);
      cardContent.appendChild(content);
      card.appendChild(cardContent);
    
      const addButton = card.querySelector('.add-button');
      addButton.addEventListener('click', () => addToCart(this));
    
      return card;
    }
    
  }

  