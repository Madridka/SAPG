<template>
  <div class="pagination">
    <baseButton
      class="pagination__button"
      purpose="tertiary"
      icon="arrow_left"
      :variant="currentPage === 1 ? 'unavailable' : null"
      @click="updatePage(currentPage - 1)"
    />

    <baseButton
      class="pagination__button"
      v-for="page in pageToShow"
      :key="page"
      :label="String(page)"
      purpose="tertiary"
      :class="{ activePage: currentPage === page }"
      @click="typeof page === 'number' && updatePage(page)"
    />

    <baseButton
      class="pagination__button"
      purpose="tertiary"
      icon="arrow_right"
      :variant="currentPage === totalPages ? 'unavailable' : null"
      @click="updatePage(currentPage + 1)"
    />
  </div>
</template>

<script>
import baseButton from "./baseButton.vue";

export default {
  name: "basePagination",
  components: {
    baseButton,
  },
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    pageToShow: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const updatePage = (newPage) => {
      if (newPage >= 1 && newPage <= props.totalPages) {
        emit("update:currentPage", newPage);
      }
    };
    return {
      updatePage,
    };
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as *;

$currentColor: #0d80ec;

.pagination {
  padding: 10px;
}

.activePage {
  background-color: #eaf0f8;
}

.pagination__button {
  color: #0d80ec;
  width: 40px;
  height: 40px;
}
</style>
