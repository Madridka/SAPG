<template>
  <form class="search__form">
    <div class="search__wrapper">
      <baseInput
        class="search__input"
        type="text"
        @input="search"
        placeholder="Ф.И.О., должность"
      />
      <img
        class="search__logo"
        src="@/assets/images/icons/icon_search.svg"
        alt=""
      />
    </div>
  </form>
</template>

<script>
import baseInput from "./baseInput.vue";

export default {
  name: "baseSearch",
  components: {
    baseInput,
  },
  setup(_, { emit }) {
    const search = (e) => {
      emit("search", e.target.value);
    };
    return {
      search,
    };
  },
};
</script>

<style lang="scss">
.search__wrapper {
  position: relative;
  display: inline-block;
}
.search__input {
  color: #595c6b;
  font-size: 16px;
  font-weight: 400;
  border-radius: 10px;
  border: none;
  padding-left: 37px;

  @media (max-width: 1919px) {
    min-width: 330px;
  }

  @media (min-width: 1920px) and (max-width: 2559px) {
    min-width: 400px;
  }

  @media (min-width: 2560px) {
    min-width: 470px;
  }

  &:hover {
    box-sizing: border-box;
    outline: 1px solid #e2e3e7;
  }
  &:focus {
    outline: 1px solid #7f8499;
  }
}

.search__logo {
  position: absolute;
  width: 20px;
  height: 20px;
  left: 9px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
