<script>
import { h, computed } from "vue";
import { RouterLink } from "vue-router";

const COLORS = {
  blue: "blue",
  red: "red",
};

export default {
  props: {
    color: {
      type: String,
      default: COLORS.blue,
      validator(color) {
        return Reflect.has(COLORS, color);
      },
    },

    rounded: Boolean,

    to: {
      type: [String, Object],
      default: undefined,
    },
  },

  setup(props, { slots }) {
    const colorsClasses = computed(() => {
      const CLASSES_BY_COLOR = new Map([
        [COLORS.blue, "text-white bg-blue-300 focus:ring-blue-400"],
        [COLORS.red, "text-white bg-red-500 focus:ring-red-600"],
      ]);

      return CLASSES_BY_COLOR.get(props.color);
    });

    const borderRadiusClasses = computed(() => {
      if (props.rounded) {
        return "p-2 rounded-full";
      }

      return "px-4 py-2 rounded-lg";
    });

    const isLink = computed(() => props.to !== undefined);

    return () =>
      h(
        isLink.value ? RouterLink : "button",
        {
          to: props.to,
          class: [
            colorsClasses.value,
            borderRadiusClasses.value,
            "text-base shadow focus:outline-none focus:ring-2 focus:ring-offset-2",
          ],
        },
        isLink.value ? slots.default : slots.default()
      );
  },
};
</script>
