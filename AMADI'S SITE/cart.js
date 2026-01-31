// Cart Management with localStorage
class CartManager {
  constructor() {
    this.cart = this.loadCart();
  }

  loadCart() {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartCount();
  }

addToCart(productId) {
  const cart = this.getCart();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,       // ✅ REQUIRED
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1
    });
  }

  this.saveCart(cart);
}


  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  getCart() {
    return this.cart;
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    const count = this.getCartCount();
    
    countElements.forEach(element => {
      if (count > 0) {
        element.textContent = count;
        element.style.display = 'flex';
      } else {
        element.style.display = 'none';
      }
    });
  }
}

// Initialize cart manager
const cartManager = new CartManager();

// Update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
  cartManager.updateCartCount();
});
