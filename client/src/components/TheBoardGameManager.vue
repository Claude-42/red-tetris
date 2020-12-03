<i18n lang="yaml">
en:
  leave-game: "Leave game"
  score-title: "Score"
  next-piece-title: "Next piece"
  other-players-title: "Other players"

fr:
  leave-game: "Quitter le jeu"
  score-title: "Score"
  next-piece-title: "Prochaine pièce"
  other-players-title: "Les autres joueurs"
</i18n>

<template>
  <div
    class="w-full max-w-4xl mx-2 mt-8 bg-white divide-y shadow sm:rounded-lg"
  >
    <header class="flex items-center justify-between px-4 py-5">
      <h2 class="py-1 text-2xl font-bold">
        {{ lobbyName }}
      </h2>
    </header>

    <div class="flex flex-wrap md:divide-x">
      <TheBoardGameGrid
        :grid="grid"
        :is-game-over="isGameOver"
        class="w-full py-4 border-gray-300 md:w-3/5"
      />

      <div
        class="flex flex-col items-stretch w-full overflow-y-scroll divide-y max-h-96 md:w-2/5"
        :style="{
          maxHeight: '600px',
        }"
      >
        <BoardGameSection>
          <template #title>
            {{ t("score-title") }}
          </template>

          <p class="pb-4 text-4xl font-bold">
            {{ score }}
          </p>
        </BoardGameSection>

        <BoardGameSection>
          <template #title>
            {{ t("next-piece-title") }}
          </template>

          <TheBoardGameNextPieceGrid :next-piece="nextPiece" />
        </BoardGameSection>

        <BoardGameSection>
          <template #title>
            {{ t("other-players-title") }}
          </template>

          <TheBoardGameShadowList :players="playersShadows" />
        </BoardGameSection>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

import BoardGameSection from "./BoardGameSection.vue";
import TheBoardGameGrid from "./TheBoardGameGrid.vue";
import TheBoardGameNextPieceGrid from "./TheBoardGameNextPieceGrid.vue";
import TheBoardGameShadowList from "./TheBoardGameShadowList.vue";

import { useGrid } from "../composables/grid.js";
import { useGame } from "../composables/game";

export default {
  components: {
    BoardGameSection,
    TheBoardGameGrid,
    TheBoardGameNextPieceGrid,
    TheBoardGameShadowList,
  },

  setup() {
    const { t } = useI18n();

    const { startGame, leaveGame } = useGame();

    const {
      state,
      lobbyName,
      grid,
      playersShadows,
      nextPiece,
      score,
      isGameOver,
    } = useGrid();

    return {
      t,

      state,
      lobbyName,
      grid,
      nextPiece,
      score,
      playersShadows,
      isGameOver,

      startGame,
      leaveGame,
    };
  },
};
</script>
