<template>
  <div>
    <div class="search-sort-container">
      <SortingOptions
        :sortAttribute="sortAttribute"
        :sortOrder="sortOrder"
        @update-sort-attribute="(value) => { sortAttribute = value; }"
        @update-sort-order="(value) => { sortOrder = value; }"
      />
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search lessons..."
          class="search-input"
        />
        <img src="@/assets/icons/search-icon.png" alt="Search Icon" class="search-icon" />
      </div>
    </div>

    <LessonList
      :lessons="filteredLessons"
      @addToCart="addToCart"
      @removeFromCart="removeFromCart"
    />
  </div>
</template>

<script>
import { ref, computed, inject, onMounted } from "vue";
import LessonList from "@/components/LessonList.vue";
import SortingOptions from "@/components/SortingOptions.vue";
import lessonsData from "@/data/lessons";
import { getCachedCart } from "@/utils";

export default {
  components: { LessonList, SortingOptions },
  setup() {
    const lessons = ref(lessonsData);
    const localCartTracker = ref({});
    const sortAttribute = ref("subject");
    const sortOrder = ref("asc");
    const searchQuery = ref("");

    const updateGlobalCart = inject("updateGlobalCart");

    const sortedLessons = computed(() => {
      return [...lessons.value].sort((a, b) => {
        const modifier = sortOrder.value === "asc" ? 1 : -1;
        return a[sortAttribute.value] < b[sortAttribute.value]
          ? -1 * modifier
          : a[sortAttribute.value] > b[sortAttribute.value]
          ? 1 * modifier
          : 0;
      });
    });

    const filteredLessons = computed(() => {
      return sortedLessons.value.filter(
        (lesson) =>
          lesson.subject.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          lesson.location.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const addToCart = (lesson) => {
      if (lesson.spaces > 0) {
        if (!localCartTracker.value[lesson.subject]) localCartTracker.value[lesson.subject] = 0;
        localCartTracker.value[lesson.subject]++;
        lesson.spaces--;
        updateGlobalCart("addToCart", { lesson });
      }
    };

    const removeFromCart = (lesson) => {
      if (localCartTracker.value[lesson.subject] > 0) {
        localCartTracker.value[lesson.subject]--;
        lesson.spaces++;
        updateGlobalCart("removeFromCart", { lesson });
      }
    };

    onMounted(() => {
      const cachedCart = getCachedCart();
      if (cachedCart) {
        const cachedCartData = JSON.parse(cachedCart);
        // Update lesson spaces based on cached cart
      }
    });

    return {
      lessons,
      sortAttribute,
      sortOrder,
      searchQuery,
      filteredLessons,
      addToCart,
      removeFromCart,
    };
  },
};
</script>

<style scoped>
.search-sort-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 200px;
}

.search-icon {
  margin-left: 10px;
  width: 20px;
  height: 20px;
}
</style>
