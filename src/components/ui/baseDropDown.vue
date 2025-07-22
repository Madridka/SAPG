<template>
  <div class="dropdown-wrapper" ref="dropDown">
    <label class="label-drop-down" for="dropdown-selected-option">
      {{ dropDownTitle }}</label
    >
    <div
      class="dropdown-selected-option"
      @click="isDropDownVisible = !isDropDownVisible"
    >
      {{ selectedOption?.value || selectedOption }}
    </div>
    <div class="options-wrapper" v-if="isDropDownVisible">
      <div
        class="option"
        v-for="option in options"
        :key="option.value"
        @click="toggleOptionSelect(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "baseDropDown",
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      default: 25,
    },
    dropDownTitle: {
      type: String,
      default: "Строки",
    },
  },
  setup(_, { emit }) {
    const dropDown = ref(null);
    const selectedOption = ref(25);
    const isDropDownVisible = ref(false);

    onMounted(() => {
      window.addEventListener("click", closeDropDown);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("click", closeDropDown);
    });

    const toggleOptionSelect = (option) => {
      selectedOption.value = option;
      emit("update:modelValue", option.value);
      isDropDownVisible.value = false;
    };

    const closeDropDown = (element) => {
      if (!dropDown.value.contains(element.target)) {
        isDropDownVisible.value = false;
      }
    };

    return {
      selectedOption,
      toggleOptionSelect,
      isDropDownVisible,
      closeDropDown,
      dropDown,
    };
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as *;

.dropdown-wrapper {
  box-sizing: border-box;
  display: flex;
  padding: 8px;
  cursor: pointer;
  min-height: 40px;
  position: relative;
  z-index: 1000;
}

.dropdown-selected-option {
  border: 1px solid #e2e4e9;
  border-radius: 10px;
  color: $color_main_blue;
  min-width: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.options-wrapper {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1000;
  border-radius: 10px;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.15);
  color: #7f8499;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.label-drop-down {
  padding: 8px;
  font-weight: 400;
  font-size: 16px;
  color: #697077;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.option {
  min-height: 37px;
  min-width: 100%;
  font-weight: 400;
  font-size: 16px;
  color: #7f8499;
  background-color: #f4f6fa;
  display: flex;
  align-items: center;
  padding-left: 16px;
}

.option:hover {
  background: $color_focus_blue;
  color: white;
}

.option:first-of-type {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.option:last-of-type {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
