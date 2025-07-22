<template>
  <div class="checkbox">
    <label class="custom__checkbox">
      <input type="checkbox" />
      <span class="checkmark"></span>
      <div class="label-firstWord">{{ labelTitle1 }} &nbsp;</div>
      {{ labelTitle2 }}
    </label>
  </div>
</template>

<script>
export default {
  name: "baseCheckbox",
  props: {
    labelTitle1: {
      type: String,
      required: true,
    },
    labelTitle2: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.checkbox {
  font-size: 16px;
  font-weight: 400;
  padding: 8px 16px;
  border-radius: 10px;

  &:hover {
    background-color: #0d80ec1a;

    .checkmark {
      border: 1px solid #138cfe;
    }
  }
}

.custom__checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 8px 0;
}

.custom__checkbox input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 1px solid #e2e3e7;
  border-radius: 6px;
  margin-right: 10px;
  position: relative;
}

.custom__checkbox input:checked + .checkmark {
  background-color: #138cfe;
}

.custom__checkbox input:checked + .checkmark::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.label-firstWord {
  color: #0d80ec;
}
</style>
