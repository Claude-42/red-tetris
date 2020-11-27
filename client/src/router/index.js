import { createRouter, createWebHashHistory } from "vue-router";

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
    path: "/:lobbyName[:playerName]",
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
  history: createWebHashHistory(""),

  routes,
});

export default router;
