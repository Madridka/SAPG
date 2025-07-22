import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "@/store/store";

import priorityPage from "@/pages/priorityPage.vue";
import authPage from "@/pages/authPage.vue";
import errorPage from "@/pages/errorPage.vue";

const routes = [
  {
    path: "/",
    name: "auth",
    component: authPage,
    meta: { nav: false, title: "Авторизация", requiresAuth: false },
    enabled: true,
  },
  {
    path: "/priority",
    name: "priority",
    component: priorityPage,
    meta: { nav: true, title: "Список приоритетов", requiresAuth: true },
    enabled: true,
  },
  {
    path: "/analytics",
    name: "analytics",
    meta: { nav: true, title: "Аналитика", requiresAuth: true },
    enabled: false,
  },
  {
    path: "/graphics",
    name: "graphics",
    meta: { nav: true, title: "График обучения", requiresAuth: true },
    enabled: false,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Not found",
    component: errorPage,
    meta: { nav: false, title: "Ошибка", requiresAuth: false },
    enabled: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  if (to.meta.requiresAuth && !store.isAuth) {
    return next({ name: "auth" });
  }
  if (to.name === "login" && store.isAuth) {
    return next({ name: "priority" });
  } else {
    next();
  }
});

export default router;
