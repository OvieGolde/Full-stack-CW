<template>
  <div>
    <!-- Navigation Toggle -->
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-primary" @click="toggleView('lessons')">Lessons</button>
      <button 
        class="btn btn-primary" 
        :disabled="cart.length === 0" 
        @click="toggleView('cart')"
      >
        View Cart ({{ cart.length }})
      </button>
    </div>

    <!-- Lessons View -->
    <div v-if="currentView === 'lessons'">
      <div class="row mb-3">
        <div class="col-md-6">
          <input 
            v-model="searchQuery" 
            @input="filterProducts" 
            class="form-control" 
            type="text" 
            placeholder="Search by subject or location"
          />
        </div>
        <div class="col-md-6">
          <select v-model="sortOption" @change="sortProducts" class="form-control">
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="location">Location</option>
            <option value="price">Price</option>
            <option value="availableSpaces">Spaces</option>
          </select>
        </div>
        <div class="col-md-6">
          <button @click="toggleSortOrder" class="btn btn-secondary">
            Toggle Order ({{ sortOrder }})
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4" v-for="product in filteredProducts" :key="product.id">
          <ProductCard :product="product" @add-to-cart="addToCart" />
        </div>
      </div>
    </div>

    <!-- Cart View -->
    <div v-else>
      <h2>Your Cart</h2>
      <div v-if="cart.length === 0">Your cart is empty.</div>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in cart" :key="item.id">
          {{ item.name }} (x{{ item.quantity }})
          <button class="btn btn-danger btn-sm" @click="removeFromCart(item)">Remove</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductCard from './ProductCard.vue';

export default {
  components: { ProductCard },
  data() {
    return {
      currentView: 'lessons', // Tracks whether to show lessons or cart
      searchQuery: '',
      sortOption: '',
      sortOrder: 'ascending', // Default sort order
      filteredProducts: [],
    };
  },
  computed: {
    ...mapState(['products', 'cart']),
  },
  methods: {
    toggleView(view) {
      this.currentView = view;
    },
    addToCart(product) {
      this.$store.commit('addToCart', product);
    },
    removeFromCart(item) {
      this.$store.commit('removeFromCart', item.id);
    },
    filterProducts() {
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.location.toLowerCase().includes(query)
        );
      });
      this.sortProducts();
    },
    sortProducts() {
      const sortKey = this.sortOption;
      if (sortKey) {
        this.filteredProducts.sort((a, b) => {
          let comparison = 0;
          if (typeof a[sortKey] === 'string') {
            comparison = a[sortKey].localeCompare(b[sortKey]);
          } else if (typeof a[sortKey] === 'number') {
            comparison = a[sortKey] - b[sortKey];
          }
          return this.sortOrder === 'ascending' ? comparison : -comparison;
        });
      }
    },
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'ascending' ? 'descending' : 'ascending';
      this.sortProducts(); // Reapply sorting when the order is toggled
    },
  },
  watch: {
    products: {
      handler(newProducts) {
        this.filteredProducts = [...newProducts];
        this.filterProducts();
      },
      immediate: true,
    },
  },
};
</script>

