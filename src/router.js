import { createWebHistory, createRouter } from "vue-router";

import NotFound from "./views/NotFound.vue";
import LoginView from "./views/LoginView.vue";
import ProjectView from "./views/ProjectView.vue";
import ProjectList from "./components/ProjectList.vue";
import ProjectDetail from "./components/ProjectDetail.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: NotFound,
      meta: {
        title: "首页",
        showInbreadcrumb: true,
      },
    },
    {
      path: "/login",
      component: LoginView,
      meta: {
        showInbreadcrumb: false,
      },
    },
    {
      path: "/projects",
      component: ProjectView,
      name: 'projects',
      meta: {
        title: "项目",
        showInbreadcrumb: true,
      },
      children: [
        {
          path: "",
          component: ProjectList,
          meta: {
            showInbreadcrumb: false,
          },
        },
        {
          path: ":id",
          component: ProjectDetail,
          props: true,
          meta: {
            title: "详情",
            showInbreadcrumb: true,
          },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, _from, next) => {
  if (to.path === "/login") {
    next();
    return;
  }
  let sessionUser = localStorage.getItem("sessionUser");
  if (!sessionUser) {
    next("/login");
    return;
  }
  next();
});
