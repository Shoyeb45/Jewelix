document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];
    const cartItemsList = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
  
    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const product = {
          id: event.target.dataset.id,
          name: event.target.dataset.name,
          price: parseFloat(event.target.dataset.price),
        };
        addToCart(product);
      });
    });
  
    // Function to update the cart
    function addToCart(product) {
      cartItems.push(product);
      updateCartDisplay();
    }
  
    // Function to update the cart display
    function updateCartDisplay() {
      // Clear existing cart items
      cartItemsList.innerHTML = '';
  
      let total = 0;
      cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(listItem);
        total += item.price;
      });
  
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  
    // Checkout button functionality (just clears the cart for now)
    document.getElementById('checkout').addEventListener('click', () => {
      if (cartItems.length > 0) {
        alert('Proceeding to checkout!');
        cartItems.length = 0; // Clear the cart
        updateCartDisplay();
      } else {
        alert('Your cart is empty.');
      }
    });
  });
  