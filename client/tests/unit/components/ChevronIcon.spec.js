import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/vue";

import ChevronIcon from "@/components/ChevronIcon.vue";

test("renders right icon", () => {
  const { container } = render(ChevronIcon, {
    props: {
      right: true,
    },
  });

  const icon = container.firstChild;

  expect(icon.className).toBe("gg-chevron-right");
});

test("renders down icon", () => {
  const { container } = render(ChevronIcon, {
    props: {
      down: true,
    },
  });

  const icon = container.firstChild;

  expect(icon.className).toBe("gg-chevron-down");
});

test("renders left icon", () => {
  const { container } = render(ChevronIcon, {
    props: {
      left: true,
    },
  });

  const icon = container.firstChild;

  expect(icon.className).toBe("gg-chevron-left");
});

test("renders up icon", () => {
  const { container } = render(ChevronIcon, {
    props: {
      up: true,
    },
  });

  const icon = container.firstChild;

  expect(icon.className).toBe("gg-chevron-up");
});

test("throws an error when no direction prop is specified", () => {
  expect(() => {
    render(ChevronIcon, {
      props: {},
    });
  }).toThrowError();
});
