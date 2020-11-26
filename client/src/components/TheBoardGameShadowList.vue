<template>
  <div class="flex flex-wrap w-full">
    <BoardGameShadowContainer
      v-for="{ name: playerName, grid } in players"
      :key="playerName"
      :player-name="playerName"
      :grid="grid"
      class="p-1"
    />
  </div>
</template>

<script>
import BoardGameShadowContainer from "./BoardGameShadowContainer.vue";

export default {
  components: {
    BoardGameShadowContainer,
  },

  props: {
    players: {
      type: Array,
      required: true,
    },
  },
};
</script>
