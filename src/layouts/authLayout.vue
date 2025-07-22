<template>
  <div class="auth">
    <div class="auth__sidebar">
      <img src="@/assets/images/background_auth.svg" alt="Фото промысла" />
    </div>
    <div class="auth__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "authLayout",
};
</script>

<style lang="scss">
.auth {
  max-width: 100%;
  max-height: 100vh;
  display: grid;
  grid-template-columns: 50% 1fr;
  justify-items: stretch;
  align-items: stretch;
}

.auth__sidebar {
  max-height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;

  img {
    padding-left: 18px;
    min-width: 100%;
    min-height: 100vh;
    object-fit: contain;
  }
}

.auth__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
