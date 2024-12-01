<template>
  <div class="card">
    <img :src="product.image" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">Location: {{ product.location }}</p>
      <p class="card-text">Spaces: {{ product.availableSpaces }}</p>
      <p class="card-text">${{ product.price }}</p>
      <button 
        class="btn btn-primary" 
        :disabled="product.availableSpaces === 0" 
        @click="addToCart"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'], // Receives a product object as a prop
  methods: {
    addToCart() {
      if (this.product.availableSpaces > 0) {
        this.$store.commit('addToCart', this.product); // Adds the product to the cart
        this.$store.commit('updateLessonSpace', {
          id: this.product.id,
          availableSpaces: this.product.availableSpaces - 1,
        });
      }
    },
  },
};
</script>
