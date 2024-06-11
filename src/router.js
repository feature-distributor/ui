import { createWebHistory, createRouter } from "vue-router";

import App from "./App.vue";
import NotFound from "./views/NotFound.vue";
import LoginView from "./views/LoginView.vue";
import ProjectListView from "./views/ProjectListView.vue";
import ProjectDetailView from "./views/ProjectDetailView.vue";
import { me } from "./api/login";
import { ca } from "vuetify/locale";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: NotFound,
    },
    {
      path: "/login",
      component: LoginView,
    },
    {
      path: "/projects",
      component: ProjectListView,
    },
    {
      path: "/project/:id",
      component: ProjectDetailView,
      props: true,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  console.log(to.path);
  if (to.path === "/login") {
    next();
    return;
  }
  let token = localStorage.getItem("token");
  if (!token) {
    console.log("no token");
    next("/login");
    return;
  }
  //检测token是否过期
  try {
    await me();
  } catch (e) {
    if (e.message === UNAUTHORIZED){
      next("/login");
      return;
    }
    console.log(e);
    next("/login");
    return;
  }
  next();
});
