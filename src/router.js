import { createWebHistory , createRouter } from 'vue-router'

import App from './App.vue'
import NotFound from './views/NotFound.vue'
import ProjectListView from './views/ProjectListView.vue'
import ProjectDetailView from './views/ProjectDetailView.vue'
  
export const router = createRouter({
  history: createWebHistory (),
  routes: [
    {
        path: '/',
        component: NotFound,
    },
    {
        path: '/projects',
        component: ProjectListView,
    },
    {
        path: '/project/:id',
        component: ProjectDetailView,
        props: true,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
  ],
})