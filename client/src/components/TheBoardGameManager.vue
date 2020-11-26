<i18n lang="yaml">
en:
  leave-game: "Leave game"

fr:
  leave-game: "Quitter le jeu"
</i18n>

<template>
  <div
    class="w-full max-w-4xl mx-2 mt-8 bg-white divide-y shadow sm:rounded-lg"
  >
    <header class="flex items-center justify-between px-4 py-5">
      <h2 class="py-1 text-2xl font-bold">
        {{ lobbyName }}
      </h2>

      <div class="flex items-center">
        <AppButton v-if="state.matches('playing.end')" color="red">
          {{ t("leave-game") }}
        </AppButton>
      </div>
    </header>

    <div class="flex flex-wrap md:divide-x">
      <TheBoardGameGrid
        :grid="grid"
        class="w-full py-4 border-gray-300 md:w-3/5"
      />

      <div
        class="flex flex-col items-stretch w-full overflow-y-scroll divide-y max-h-96 md:w-2/5"
        :style="{
          maxHeight: '600px',
        }"
      >
        <BoardGameSection>
          <template #title> Score </template>

          <p class="pb-4 text-4xl font-bold">4000</p>
        </BoardGameSection>

        <BoardGameSection>
          <template #title> Prochaine pièce </template>

          <TheBoardGameNextPieceGrid :next-piece="nextPiece" />
        </BoardGameSection>

        <BoardGameSection>
          <template #title> Les autres joueurs </template>

          <TheBoardGameShadowList :players="playersShadows" />
        </BoardGameSection>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

import AppButton from "./AppButton.vue";
import BoardGameSection from "./BoardGameSection.vue";
import TheBoardGameGrid from "./TheBoardGameGrid.vue";
import TheBoardGameNextPieceGrid from "./TheBoardGameNextPieceGrid.vue";
import TheBoardGameShadowList from "./TheBoardGameShadowList";

import { useGrid } from "../composables/grid.js";

export default {
  components: {
    AppButton,
    BoardGameSection,
    TheBoardGameGrid,
    TheBoardGameNextPieceGrid,
    TheBoardGameShadowList,
  },

  setup() {
    const { t } = useI18n();

    const {
      state,
      lobbyName,
      grid,
      playersShadows,
      nextPiece,
      startGame,
    } = useGrid();

    return {
      t,

      state,
      lobbyName,
      grid,
      nextPiece,
      startGame,
      playersShadows,
    };
  },
};
</script>
