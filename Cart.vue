<template>
    <div class="cart-container">
      <h2>Your Cart</h2>
  
      <div v-if="cartItems.length > 0" class="cart-items">
        <div v-for="(item, index) in cartItems" :key="item.id" class="cart-item">
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p>Subject: {{ item.subject }}</p>
            <p>Location: {{ item.location }}</p>
            <p>Price: ${{ item.price.toFixed(2) }}</p>
          </div>
  
          <div class="item-actions">
            <button @click="removeItem(index)" class="remove-button">Remove</button>
          </div>
        </div>
  
        <div class="cart-summary">
          <h3>Total: ${{ cartTotal.toFixed(2) }}</h3>
          <button @click="checkout" class="checkout-button">Checkout</button>
        </div>
      </div>
  
      <div v-else class="empty-cart">
        <p>Your cart is empty. Add some classes to proceed!</p>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from "vue";
  import { useStore } from "vuex";
  
  export default {
    name: "Cart",
  
    setup() {
      const store = useStore();
  
      // Computed properties for cart items and total price
      const cartItems = computed(() => store.state.cart.items);
      const cartTotal = computed(() => {
        return cartItems.value.reduce((total, item) => total + item.price, 0);
      });
  
      // Remove item from cart
      const removeItem = (index) => {
        store.commit("cart/removeItem", index);
      };
  
      // Placeholder checkout action
      const checkout = () => {
        alert("Proceeding to checkout...");
        store.commit("cart/clearCart");
      };
  
      return {
        cartItems,
        cartTotal,
        removeItem,
        checkout,
      };
    },
  };
  </script>
  
  <style scoped>
  .cart-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .item-details h3 {
    margin: 0;
  }
  
  .item-details p {
    margin: 5px 0;
  }
  
  .item-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .remove-button,
  .checkout-button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .remove-button {
    background-color: #ff4d4d;
    color: #fff;
  }
  
  .checkout-button {
    background-color: #4caf50;
    color: #fff;
  }
  
  .empty-cart {
    text-align: center;
    font-size: 18px;
    color: #555;
  }
  
  .cart-summary {
    text-align: right;
    margin-top: 20px;
  }
  
  .cart-summary h3 {
    margin: 0;
    margin-bottom: 10px;
  }
  </style>
