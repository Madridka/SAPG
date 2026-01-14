<template>
  <authLayout>
    <div class="form__wrapper" v-if="!isUserTemporary">
      <img
        class="auth__logo"
        src="@/assets/images/logo_auth_large.png"
        alt="Лого"
      />
      <div class="auth__title">Авторизация</div>
      <form class="auth__form" @submit.prevent="handleSubmit">
        <label class="auth__label" for="login">Логин</label>
        <baseInput
          class="login__input"
          id="login"
          v-model="initialValue.email"
          inputType="text"
          placeholder="Введите e-mail"
          :class="{ error__border: loginError }"
        />
        <p>
          <span
            class="error__input"
            :style="{ visibility: loginError ? 'visible' : 'hidden' }"
            >{{ loginErrorText }}</span
          >
        </p>
        <label class="auth__label" for="password">Пароль</label>
        <div class="password__wrapper">
          <baseInput
            class="login__input"
            id="password"
            v-model="initialValue.password"
            :inputType="showPassword ? 'text' : 'password'"
            placeholder="Введите пароль"
            :class="{ error__border: passwordError }"
          />
          <button
            type="button"
            class="toggle__password"
            @click.prevent="togglePasswordVisibility"
          >
            <span v-if="showPassword">
              <img
                class="input__eye"
                src="@/assets/images/icons/icon_open_eye.svg"
                alt=""
              />
            </span>
            <span v-else>
              <img
                class="input__eye"
                src="@/assets/images/icons/icon_close_eye.svg"
                alt=""
              />
            </span>
          </button>
        </div>
        <p>
          <span
            class="error__password-margin"
            :style="{ visibility: passwordError ? 'visible' : 'hidden' }"
            >{{ passwordErrorText }}</span
          >
        </p>
        <div class="button__wrapper">
          <baseButton
            type="submit"
            label="Войти"
            purpose="primary"
            size="small"
            :variant="loading ? 'unavailable' : null"
          />
        </div>
      </form>
    </div>
    <div v-else>
      <changePassword :initialValue="initialValue"></changePassword>
    </div>
  </authLayout>
</template>

<script>
import { watch } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
// import { useStore } from "@/store/store";
// import { login } from "@/common/api/auth.js";

import authLayout from "@/layouts/authLayout.vue";
import baseInput from "@/components/ui/baseInput.vue";
import baseButton from "@/components/ui/baseButton.vue";
import changePassword from "@/components/changePassword.vue";

export default {
  name: "authPage",
  components: {
    authLayout,
    baseInput,
    baseButton,
    changePassword,
  },

  setup() {
    const router = useRouter();
    // const store = useStore();
    const showPassword = ref(false);
    const initialValue = ref({ email: "", password: "" });
    const loginError = ref(false);
    const passwordError = ref(false);
    const loginErrorText = ref("");
    const passwordErrorText = ref("");
    const isUserTemporary = ref(false);
    const loading = ref(false);

    // const handleSubmit = async () => {
    //   if (!initialValue.value.email) {
    //     loginError.value = true;
    //     loginErrorText.value = "Обязательное поле";
    //     return;
    //   }

    //   if (!initialValue.value.password) {
    //     passwordError.value = true;
    //     passwordErrorText.value = "Обязательное поле";
    //     return;
    //   }

    //   try {
    //     loading.value = true;

    //     const user = await login({
    //       email: initialValue.value.email,
    //       password: initialValue.value.password,
    //     });
    //     localStorage.setItem("access_token", user.access_token);
    //     store.setToken(user.access_token);
    //     store.setUserRole(user.user_role);

    //     if (user.must_change_password) {
    //       isUserTemporary.value = true;
    //       return;
    //     }
    //     if (user.user_role === "Admin") {
    //       window.location.href = "https://gzprm.asapeducation.online/admin/";
    //     } else {
    //       router.push("/priority");
    //     }
    //   } catch (error) {
    //     const responseData = error?.response?.data;
    //     if (
    //       responseData.message ===
    //       "The email field must be a valid email address."
    //     ) {
    //       loginError.value = true;
    //       loginErrorText.value = "Введите корректный email";
    //     }
    //     if (responseData.email === "Email doesn't match any entry") {
    //       loginError.value = true;
    //       loginErrorText.value = "Такого пользователя не существует";
    //     }
    //     if (responseData.message === "Invalid credentials") {
    //       passwordError.value = true;
    //       passwordErrorText.value = "Неверный пароль";
    //     }
    //   } finally {
    //     loading.value = false;
    //   }
    // };

    const handleSubmit = () => {
      router.push("/priority");
    };
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    watch(initialValue.email, () => {
      loginError.value = false;
      loginErrorText.value = "";
    });
    watch(initialValue.password, () => {
      passwordError.value = false;
      passwordErrorText.value = "";
    });

    return {
      handleSubmit,
      togglePasswordVisibility,
      initialValue,
      loginError,
      passwordError,
      showPassword,
      loginErrorText,
      passwordErrorText,
      isUserTemporary,
      loading,
    };
  },
};
</script>

<style lang="scss">
.form__wrapper {
  margin: 20px;
  gap: 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  max-width: 633px;
}

.auth__title {
  font-size: 32px;
  font-weight: 600;
  align-self: flex-start;
  padding-bottom: 32px;
  padding-top: 92px;
}

.auth__logo {
  width: 457px;
  height: 212px;
}

.password__wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.toggle__password {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.button__wrapper {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

.login__input {
  margin: 4px 4px 4px 0;
  width: 585px;
  font-size: 20px;
  border-color: #e2e3e7;
}

.login__input::placeholder {
  font-size: 20px;
  font-weight: 400;
  color: #7f8499;
}

.auth__label {
  font-size: 18px;
}

.error__input {
  min-height: 28px;
  display: block;
  font-size: 13px;
  color: red;
  margin-bottom: 25px;
}

.error__password-margin {
  min-height: 28px;
  display: block;
  font-size: 13px;
  color: red;
  margin-bottom: 50px;
}

.error__border {
  border-color: red;
}

.green__border {
  border-color: green;
}

.input__eye {
  max-width: 19px;
}
</style>
