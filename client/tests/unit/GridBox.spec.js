import { shallowMount } from "@vue/test-utils";
import GridBox, { BOX_TYPES } from "@/components/GridBox.vue";

describe("GridBox.vue", () => {
  it("renders box with correct classes when passing background type", () => {
    const wrapper = shallowMount(GridBox, {
      props: {
        type: BOX_TYPES.BACKGROUND,
      },
    });

    expect(wrapper.classes()).toStrictEqual([
      "bg-gray-200",
      "w-6",
      "h-6",
      "border",
    ]);
  });

  it("renders box with correct classes when passing blocked type", () => {
    const wrapper = shallowMount(GridBox, {
      props: {
        type: BOX_TYPES.BLOCKED,
      },
    });

    expect(wrapper.classes()).toStrictEqual([
      "bg-gray-600",
      "w-6",
      "h-6",
      "border",
    ]);
  });

  it("renders box with correct classes when passing piece type", () => {
    const wrapper = shallowMount(GridBox, {
      props: {
        type: BOX_TYPES.PIECE,
      },
    });

    expect(wrapper.classes()).toStrictEqual(["w-6", "h-6", "border"]);
  });
});
