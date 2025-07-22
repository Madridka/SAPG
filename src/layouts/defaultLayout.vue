<template>
  <div class="container">
    <header class="header">
      <div class="header__logo">
        <router-link exact to="/priority">
          <img src="@/assets/images/logo.png" alt="Лого" />
        </router-link>
      </div>
      <div class="header__content">
        <div class="header__content__main">
          {{ title }}
          <div class="header__content__profile">
            <img
              class="profile__logo"
              src="@/assets/images/icons/icon_avatar.svg"
              alt=""
            />
            <div>
              <label class="profile__label">Петрова Анна</label>
              <span class="profile__badge">
                <span v-if="userRole === 'training_head'">
                  <img
                    src="@/assets/images/icons/badge/badge_head.png"
                    alt="Начальник обучения"
                  />
                </span>
                <span v-else>
                  <img
                    src="@/assets/images/icons/badge/badge_admin.png"
                    alt="Админ"
                  />
                </span>
              </span>
            </div>
            <baseButton
              class="button__exit"
              label="Выход"
              purpose="exit"
              icon="exit"
              @click="logOut"
            />
          </div>
        </div>
        <div class="header__content__filter">
          <slot name="button__group"></slot>
        </div>
        <div class="header__content__pagination">
          <slot name="pagination"></slot>
        </div>
      </div>
    </header>
    <div class="sidebar">
      <nav v-for="route in navRoutes" :key="route.path">
        <template v-if="route.enabled">
          <a class="sidebar__nav" v-if="route.isExternal" :href="route.path">{{
            route.meta.title
          }}</a>
          <router-link
            v-else
            :to="route.path"
            class="sidebar__nav"
            active-class="nav__active"
          >
            {{ route.meta.title }}
          </router-link>
        </template>
        <template v-else>
          <div class="sidebar__nav--disabled">
            {{ route.meta.title }}
          </div>
        </template>
      </nav>
    </div>
    <div class="content"><slot name="list"></slot></div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/store";

import baseButton from "@/components/ui/baseButton.vue";

export default {
  name: "defaultLayout",
  components: {
    baseButton,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
  },

  setup() {
    const router = useRouter();
    const store = useStore();

    const navRoutes = computed(() => {
      const navsExternal = [
        {
          path: "https://gzprm.asapeducation.online/admin/resource/user-resource/index-page",
          name: "admin",
          meta: { nav: true, title: "Пользователи", requiresAuth: true },
          enabled: true,
          isExternal: true,
        },
        {
          path: "https://gzprm.asapeducation.online/admin/resource/permit-resource/index-page",
          name: "reference",
          meta: { nav: true, title: "Справочники", requiresAuth: true },
          enabled: true,
          isExternal: true,
        },
      ];
      const navsRouter = router.options.routes.filter(
        (route) => route.meta.nav
      );

      return userRole.value === "Admin"
        ? [...navsExternal, ...navsRouter]
        : [...navsRouter];
    });

    const logOut = () => {
      store.clearToken();
      router.push("/");
    };

    const userRole = computed(() => store.userRole);

    return {
      navRoutes,
      logOut,
      userRole,
    };
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/variables.scss" as *;

.nav__active {
  border-right: 5px solid $color_main_blue;
  background-color: $color_light_blue !important;
  color: $color_main_blue !important;
}

.button__exit {
  width: 110px;
}

.header__content__profile {
  display: flex;
  align-items: center;
}

.profile__label {
  font-size: 20px;
  font-weight: 400;
  color: #7f8499;
}

.profile__logo {
  width: 21px;
  height: 21px;
  padding-right: 5px;
}

.profile__badge {
  padding: 0px 44px 0px 4px;
}

.sidebar__nav:hover {
  background-color: #0d80ec1a;
  color: #138cfe;
}
</style>
