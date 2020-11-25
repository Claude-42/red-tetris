import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import GamesList from "../views/GamesList.vue";
import BoardGame from "../views/BoardGame.vue";
import Game from "../views/Game.vue";
import CreateGame from "../views/CreateGame.vue";
import GameFull from "../views/GameFull.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/games",
    component: GamesList,
  },
  {
    path: "/create-game",
    component: CreateGame,
  },
  {
    path: "/game/:id",
    component: Game,
  },
  {
    path: "/game-full",
    component: GameFull,
  },
  {
    path: "/board-game",
    component: BoardGame,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
