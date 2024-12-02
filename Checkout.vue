<template>
  <div class="checkout-container">
    <h1>Checkout Page</h1>
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <h3>{{ item.subject }}</h3>
        <p>Price: £{{ item.price }}</p>
        <p>Spaces: {{ item.spaces }}</p>
        <button @click="removeFromCart(item)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    cartItems: {
      type: Array,
      required: true,
      default: 0
    },
  },
  emits: ["remove-from-cart"],
  setup(props, { emit }) {
    // Emit remove event
    const removeFromCart = (item) => {
      emit("remove-from-cart", item);
    };

    return {
      removeFromCart,
    };
  },
});
</script>

<style scoped>
.checkout-container {
  padding: 20px;
}
.cart-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
</style>
