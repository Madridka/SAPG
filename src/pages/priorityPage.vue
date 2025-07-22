<template>
  <defaultLayout title="Список приоритетов">
    <template #button__group>
      <baseButton
        class="button__filter"
        purpose="primary-light"
        size="large"
        icon="filter"
        @click="isModalOpen = true"
      />
      <baseSearch @search="handleSearch" />
      <div class="button__group">
        <baseButton
          class="button__group-width"
          label="Выгрузка"
          purpose="primary-light"
          size="medium"
          icon="import"
          iconPosition="left"
        />
        <baseButton
          class="button__group-width"
          label="Загрузка"
          purpose="primary"
          size="large"
          icon="export"
          iconPosition="left"
        />
      </div>
    </template>

    <template #pagination>
      <basePagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :pageToShow="pageToShow"
        @update:currentPage="currentPage = $event"
      />
      <baseDropDown
        dropDownTitle="Строки"
        :options="options"
        v-model="rowsPerPage"
      />
    </template>

    <template #list>
      <priorityList :users="paginatedUsers" />
      <modalFilter :isModalOpen="isModalOpen" @close="isModalOpen = false" />
    </template>
  </defaultLayout>
</template>

<script>
import { computed, watch } from "vue";
import { ref } from "vue";
import { useStore } from "@/store/store";

import defaultLayout from "@/layouts/defaultLayout.vue";
import priorityList from "@/components/priorityList.vue";
import modalFilter from "@/components/modalFilter.vue";
import baseButton from "@/components/ui/baseButton.vue";
import basePagination from "@/components/ui/basePagination.vue";
import baseDropDown from "@/components/ui/baseDropDown.vue";
import baseSearch from "@/components/ui/baseSearch.vue";

export default {
  name: "priorityPage",
  components: {
    defaultLayout,
    priorityList,
    baseButton,
    basePagination,
    baseDropDown,
    baseSearch,
    modalFilter,
  },
  setup() {
    const store = useStore();
    const DataSetPriority = computed(() => store.DataSetPriority);
    const rowsPerPage = ref(25);
    const currentPage = ref(1);
    const isModalOpen = ref(false);

    const searchFilter = ref("");

    watch(rowsPerPage, () => {
      currentPage.value = 1;
    });

    const options = [
      { value: 25, label: "25 строк" },
      { value: 50, label: "50 строк" },
      { value: 75, label: "75 строк" },
    ];

    const handleSearch = (search) => {
      searchFilter.value = search;
    };

    const filteredDataSet = computed(() => {
      if (searchFilter.value !== "") {
        return DataSetPriority.value.filter(
          (user) =>
            user.full_name
              .toLowerCase()
              .includes(searchFilter.value.toLowerCase()) ||
            user.category
              .toLowerCase()
              .includes(searchFilter.value.toLowerCase())
        );
      }
      return DataSetPriority.value;
    });

    const totalPages = computed(() =>
      Math.ceil(DataSetPriority.value.length / rowsPerPage.value)
    );

    const paginatedUsers = computed(() => {
      const startIndex = (currentPage.value - 1) * rowsPerPage.value;
      const endIndex = currentPage.value * rowsPerPage.value;
      return filteredDataSet.value.slice(startIndex, endIndex);
    });

    const pageToShow = computed(() => {
      const total = totalPages.value;
      const current = currentPage.value;

      if (total <= 4) {
        const pages = [];
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
        return pages;
      }
      if (current <= 5) {
        return [1, 2, 3, 4, 5, "...", total];
      }
      if (current >= total - 3) {
        return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, "...", current - 1, current, current + 1, "...", total];
      }
    });

    return {
      rowsPerPage,
      currentPage,
      totalPages,
      paginatedUsers,
      pageToShow,
      options,
      isModalOpen,
      handleSearch,
      searchFilter,
      filteredDataSet,
    };
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as *;
.rowsPage {
  color: #697077;
  font-size: 16px;
  font-weight: 400;
}

.button__filter {
  width: 55px;
  height: 55px;
  margin-left: 25px;
}

.button__group {
  display: flex;
  gap: 20px;

  &-width {
    width: 146px;
  }
}
</style>
