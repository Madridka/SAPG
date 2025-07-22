<template>
  <div class="form__wrapper">
    <img src="@/assets/images/logo.png" alt="Лого" />
    <div class="auth__title">Сменить пароль</div>
    <div class="password__tip">
      Это Ваш первый вход, установите новый пароль. Если вы пропустите этот шаг,
      пароль можно будет изменить только через
      <a class="changePass__link" href="mailto:mail@mail.ru">администратора.</a>
    </div>
    <form class="change__form" @submit.prevent="confirmChange">
      <label class="auth__label" for="login">Новый пароль</label>
      <baseInput
        class="login__input"
        v-model="newPassword"
        inputType="text"
        placeholder=""
        :class="{
          error__border: isPasswordError,
          green__border: isPasswordMatch,
        }"
      />

      <div class="input__tip">
        Пароль должен содержать латинские буквы, не менее 8 знаков, не менее 1
        заглавной буквы, без пробелов.
      </div>
      <label class="auth__label" for="password">Повторите пароль</label>
      <div class="password__wrapper">
        <baseInput
          class="login__input"
          v-model="confirmPassword"
          inputType="text"
          placeholder=""
          :class="{
            error__border: isPasswordError,
            green__border: isPasswordMatch,
          }"
        />
      </div>
      <p>
        <span class="error__input">{{ passwordErrorText }}</span>
      </p>
      <div class="button__wrapper">
        <baseButton
          type="button"
          class="changePass__button"
          label="Оставить текущий"
          purpose="secondary"
          size="medium"
          @click="keepOldPass"
        />
        <baseButton
          type="submit"
          class="changePass__button"
          label="Сменить"
          purpose="primary"
          size="medium"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { watch, computed } from "vue";
import { changePassword } from "@/common/api/auth.js";

import baseInput from "@/components/ui/baseInput.vue";
import baseButton from "@/components/ui/baseButton.vue";

export default {
  name: "changePassword",
  components: {
    baseInput,
    baseButton,
  },
  props: {
    initialValue: {
      type: Object,
    },
  },
  setup(props) {
    const router = useRouter();
    const newPassword = ref("");
    const confirmPassword = ref("");
    const passwordErrorText = ref("");
    const isPasswordError = ref(false);

    const confirmChange = async () => {
      if (newPassword.value === "" || confirmPassword.value === "") {
        isPasswordError.value = true;
        passwordErrorText.value = "Оба поля обязательны для заполнения";
        return;
      }
      if (newPassword.value !== confirmPassword.value) {
        isPasswordError.value = true;
        passwordErrorText.value = "Пароли не совпадают";
        return;
      }

      try {
        await changePassword({
          password: newPassword.value,
          password_confirmation: confirmPassword.value,
        });
        router.push("/priority");
      } catch (error) {
        isPasswordError.value = true;
        passwordErrorText.value =
          "Ошибка смены пароля. Пароль не соответствует требованиям.";
      }
    };

    const keepOldPass = async () => {
      try {
        await changePassword({
          password: props.initialValue.password,
          password_confirmation: props.initialValue.password,
        });
        router.push("/priority");
      } catch (error) {
        isPasswordError.value = true;
        passwordErrorText.value =
          "Ошибка смены пароля. Пароль не соответствует требованиям.";
      }
    };

    const isPasswordMatch = computed(() => {
      return (
        newPassword.value !== "" &&
        confirmPassword.value !== "" &&
        newPassword.value === confirmPassword.value
      );
    });

    watch(newPassword, () => {
      passwordErrorText.value = "";
      isPasswordError.value = false;
    });
    watch(confirmPassword, () => {
      passwordErrorText.value = "";
      isPasswordError.value = false;
    });

    return {
      keepOldPass,
      newPassword,
      confirmPassword,
      passwordErrorText,
      confirmChange,
      isPasswordError,
      isPasswordMatch,
    };
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as *;

.password__tip {
  background-color: $color_light_blue;
  color: $color_focus_blue;
  border-radius: 10px;
  padding: 10px;
  width: 580px;
  align-self: flex-start;
}

.input__tip {
  max-width: 580px;
  font-weight: 400;
  color: #7f8499;
  padding-bottom: 15px;
}

.changePass__button {
  width: 285px;
  margin: 5px;
}

.changePass__link {
  color: inherit;
  text-decoration: underline;
}
</style>
