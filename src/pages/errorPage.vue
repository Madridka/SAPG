<template>
  <div class="auth">
    <div class="auth__sidebar">
      <img
        class="error__image"
        src="@/assets/images/background_auth.svg"
        alt="Фото промысла"
      />
    </div>
    <div class="auth__content">
      <div class="errorPage__title__main">404</div>
      <div class="errorPage__title__second">Извините, страница не найдена</div>
      <baseButton
        class="errorPage__button"
        label="На главную"
        purpose="primary"
        size="large"
        @click="$router.push('/')"
      />
    </div>
  </div>
</template>

<script>
import baseButton from "@/components/ui/baseButton.vue";

export default {
  name: "errorPage",
  components: {
    baseButton,
  },
};
</script>

<style>
.error__image {
  opacity: 40%;
}

.errorPage__title__main {
  font-weight: 400;
  font-size: 128px;
  color: #0d80ec;
  line-height: 130%;
}

.errorPage__title__second {
  font-size: 32px;
  font-weight: 400;
  color: #7f8499;
  padding-bottom: 32px;
}

.errorPage__button {
  max-width: 141px;
  max-height: 48px;
}
</style>
