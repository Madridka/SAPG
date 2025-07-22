<template>
  <div class="accordion">
    <div
      class="accordion__item"
      v-for="item in items"
      :key="item.id"
      :class="{ 'accordion__item-active': activeItem === item.id }"
    >
      <div class="accordion__header" @click.prevent="toggleItem(item.id)">
        <span>{{ item.title }}</span>
        <span v-if="activeItem === item.id">
          <img src="@/assets/images/icons/icon_close.svg" alt="Открыть " />
        </span>
        <span v-else>
          <img src="@/assets/images/icons/icon_arrow_down.svg" alt="Закрыть" />
        </span>
      </div>
      <div v-if="activeItem === item.id" class="accordion__content">
        <baseSearch />
        <baseCheckbox labelTitle1="Сгруппировать" labelTitle2="по допуску" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

import baseSearch from "@/components/ui/baseSearch.vue";
import baseCheckbox from "@/components/ui/baseCheckbox.vue";

export default {
  name: "filterAccordion",
  components: {
    baseSearch,
    baseCheckbox,
  },

  setup() {
    const activeItem = ref(null);
    const items = reactive([
      {
        id: 1,
        title: "По допуску",
      },
      {
        id: 2,
        title: "По филиалу",
      },
      {
        id: 3,
        title: "По категории",
      },
      {
        id: 4,
        title: "По должности",
      },
    ]);

    const toggleItem = (id) => {
      if (activeItem.value === id) {
        activeItem.value = null;
      } else {
        activeItem.value = id;
      }
    };
    return {
      activeItem,
      items,
      toggleItem,
    };
  },
};
</script>

<style lang="scss">
.accordion {
  width: 100%;
  color: #7f8499;

  &__item {
    margin-bottom: 10px;
    overflow: hidden;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    color: #7f8499;
    padding: 10px;
    cursor: pointer;
  }

  &__content {
    padding: 8px;
  }

  &__text {
    font-size: 20px;
    padding: 4px;
    margin: 10px;
    color: #555;
    line-height: 1.6;
  }
}

.accordion__item-active .accordion__content {
  display: block;
}
</style>
