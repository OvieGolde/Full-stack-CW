<template>
  <div class="sorting-options">
    <label :for="sortAttributeId">Sort by:</label>
    <select
      :id="sortAttributeId"
      v-model="localSortAttribute"
      @change="updateSortAttribute"
    >
      <option value="subject">Subject</option>
      <option value="location">Location</option>
      <option value="price">Price</option>
      <option value="availability">Availability</option>
    </select>

    <label :for="sortOrderId">Order:</label>
    <select
      :id="sortOrderId"
      v-model="localSortOrder"
      @change="updateSortOrder"
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";

export default {
  props: {
    sortAttribute: {
      type: String,
      required: true,
    },
    sortOrder: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    // Local state
    const localSortAttribute = ref(props.sortAttribute);
    const localSortOrder = ref(props.sortOrder);

    // Unique ID for accessibility
    const uniqueId = ref(generateUniqueId());
    const sortAttributeId = computed(() => `sort-attribute-${uniqueId.value}`);
    const sortOrderId = computed(() => `sort-order-${uniqueId.value}`);

    // Emit updated values to the parent
    const updateSortAttribute = () => {
      emit("update-sort-attribute", localSortAttribute.value);
    };

    const updateSortOrder = () => {
      emit("update-sort-order", localSortOrder.value);
    };

    // Sync with props
    watch(
      () => props.sortAttribute,
      (newVal) => {
        localSortAttribute.value = newVal;
      }
    );

    watch(
      () => props.sortOrder,
      (newVal) => {
        localSortOrder.value = newVal;
      }
    );

    // Utility to generate a unique ID
    function generateUniqueId() {
      return Math.random().toString(36).substr(2, 9);
    }

    return {
      localSortAttribute,
      localSortOrder,
      sortAttributeId,
      sortOrderId,
      updateSortAttribute,
      updateSortOrder,
    };
  },
};
</script>

<style scoped>
.sorting-options {
  display: flex;
  align-items: center;
  gap: 10px;
}

label {
  margin-right: 5px;
}

select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>

