<template>
  <i :class="classes" aria-hidden="true"></i>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    right: Boolean,
    down: Boolean,
    left: Boolean,
    up: Boolean,
  },

  setup(props) {
    const classes = computed(() => {
      if (props.right) {
        return "gg-chevron-right";
      }

      if (props.down) {
        return "gg-chevron-down";
      }

      if (props.left) {
        return "gg-chevron-left";
      }

      if (props.up) {
        return "gg-chevron-up";
      }

      throw new Error("Chevron type must be specified");
    });

    return {
      classes,
    };
  },
};
</script>

<style scoped>
.gg-chevron-down {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 22px;
  border: 2px solid transparent;
  border-radius: 100px;
}
.gg-chevron-down::after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid;
  border-right: 2px solid;
  transform: rotate(45deg);
  left: 4px;
  top: 2px;
}

.gg-chevron-left {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 22px;
  border: 2px solid transparent;
  border-radius: 100px;
}

.gg-chevron-left::after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid;
  border-left: 2px solid;
  transform: rotate(45deg);
  left: 6px;
  top: 4px;
}

.gg-chevron-right {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 22px;
  border: 2px solid transparent;
  border-radius: 100px;
}

.gg-chevron-right::after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid;
  border-right: 2px solid;
  transform: rotate(-45deg);
  right: 6px;
  top: 4px;
}

.gg-chevron-up {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 22px;
  border: 2px solid transparent;
  border-radius: 100px;
}

.gg-chevron-up::after {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 10px;
  height: 10px;
  border-top: 2px solid;
  border-right: 2px solid;
  transform: rotate(-45deg);
  left: 4px;
  bottom: 2px;
}
</style>
