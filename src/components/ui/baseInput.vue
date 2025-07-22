<template>
  <input
    class="input__base"
    maxlength="50"
    :placeholder="placeholder"
    :type="inputType"
    :accept="accept"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "baseInput",
  props: {
    placeholder: {
      type: String,
      required: false,
    },
    inputType: {
      type: String,
      required: false,
      default: "text",
    },
    accept: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as *;

.input__base {
  display: flex;
  min-width: 585px;
  min-height: 60px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;

  &:focus,
  &:active {
    outline: none;
    border-color: $color_main_blue;
  }
}

.input__base::placeholder {
  font-family: "Fira sans", sans-serif;
}
</style>
