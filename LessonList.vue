<template>
  <div class="lesson-list">
    <div v-for="lesson in lessons" :key="lesson.id" class="lesson-card">
      <img :src="lesson.imagePath" :alt="lesson.imageAlt" class="lesson-image" />
      <h3>{{ lesson.subject }}</h3>
      <p>Location: {{ lesson.location }}</p>
      <p>Price: £{{ lesson.price }}</p>
      <p>Duration: {{ lesson.duration }}</p> <!-- Display duration -->
      <p>Spaces: {{ lesson.spaces }}</p>

      <div class="availability-message" :class="getMessageClass(lesson.spaces)">
        <span v-if="lesson.spaces === 0">Sold Out!</span>
        <span v-else-if="lesson.spaces <= 5">Only {{ lesson.spaces }} left!</span>
        <span v-else>Available</span>
      </div>

      <div class="cart-buttons">
        <button @click="addToCart(lesson)">Add to Cart</button>
        <button v-if="lesson.spaces < 10" @click="removeFromCart(lesson)">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lessons: Array,
  },
  emits: ["addToCart", "removeFromCart"],
  setup(props, { emit }) {
    const getMessageClass = (spaces) => {
      if (spaces === 0) return "sold-out";
      if (spaces <= 5) return "few-left";
      return "available";
    };

    const addToCart = (lesson) => emit("addToCart", lesson);
    const removeFromCart = (lesson) => emit("removeFromCart", lesson);

    return { getMessageClass, addToCart, removeFromCart };
  },
};
</script>

<style scoped>
.lesson-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.lesson-card {
  width: 200px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  background-color: #f9f9f9;
}

.lesson-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.cart-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.cart-buttons button {
  padding: 5px 10px;
  font-size: 0.9rem;
  cursor: pointer;
}

.availability-message {
  margin-top: 5px;
}

.sold-out {
  color: red;
}

.few-left {
  color: orange;
}

.available {
  color: green;
}
</style>
