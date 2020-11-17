import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import BoardGame from "../views/BoardGame.vue";

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/board-game",
    component: BoardGame
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
