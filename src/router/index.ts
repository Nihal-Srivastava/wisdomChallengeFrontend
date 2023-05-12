import SignInPage from "../views/SignInPage.vue";
import SignUpPage from "../views/SignUpPage.vue";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signup",
      name: "signUpPage",
      component: SignUpPage,
    },
    {
      path: "/",
      name: "signInPage",
      component: SignInPage,
    },
  ],
});

export default router;
