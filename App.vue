<template>
  <div>
    <header class="app-header">
      <h1 class="app-title">Extra Curriculars</h1>
      <div class="cart-container">
        <img src="@/assets/icons/cart-icon.png" alt="Cart" class="cart-icon" />
        <span class="cart-count">{{ totalCartItems }}</span>
        <button class="checkout-button" @click="navigateToCheckout">Checkout</button>
      </div>
    </header>

    <router-view :cart="cart" />
  </div>
</template>

<script>
import { ref, computed, onMounted, provide } from "vue";
import { getCachedCart, updateCachedCart } from "./utils";
import { useRouter } from "vue-router";

const defaultCache = { addedLessons: [], cartTotal: 0 };

export default {
  setup() {
    const router = useRouter();
    const cart = ref(defaultCache);

    const totalCartItems = computed(() =>
      cart.value.addedLessons.reduce((total, item) => total + item.quantity, 0)
    );

    const navigateToCheckout = () => {
      router.push("/checkout");
    };

    onMounted(() => {
      const cachedCart = getCachedCart();
      if (cachedCart) cart.value = JSON.parse(cachedCart);
    });

    provide("cart", cart);

    return { cart, totalCartItems, navigateToCheckout };
  },
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 20px 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 2rem;
  color: #007bff;
}

.cart-container {
  display: flex;
  align-items: center;
}

.cart-icon {
  width: 30px;
  height: 30px;
}

.cart-count {
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  font-size: 1rem;
}

.checkout-button {
  margin-left: 20px;
  padding: 10px 20px;
  background-color: #0056b3;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
}
</style>
