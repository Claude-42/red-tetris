import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/vue";

import GridBox from "@/components/GridBox.vue";

test("creates red piece", () => {
  const COLOR = 2; // RED
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-red-400",
    "w-6",
    "h-6",
    "border",
    "border-gray-300",
  ]);
});

test("creates blue piece", () => {
  const COLOR = 3; // BLUE
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-blue-700",
    "w-6",
    "h-6",
    "border",
    "border-gray-300",
  ]);
});

test("creates turquoise piece", () => {
  const COLOR = 4; // TURQUOISE
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-blue-300",
    "w-6",
    "h-6",
    "border",
    "border-gray-300",
  ]);
});

test("creates orange piece", () => {
  const COLOR = 5; // ORANGE
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-yellow-500",
    "w-6",
    "h-6",
    "border",
    "border-gray-300",
  ]);
});

test("creates green piece", () => {
  const COLOR = 6; // GREEN
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-green-500",
    "w-6",
    "h-6",
    "border",
    "border-gray-300",
  ]);
});

test("creates purple piece", () => {
  const COLOR = 7; // PURPLE
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-purple-600",
    "w-6",
    "h-6",
    "border",
    "border-gray-300",
  ]);
});

test("creates yellow piece", () => {
  const COLOR = 8; // YELLOW
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-yellow-300",
    "w-6",
    "h-6",
    "border",
    "border-gray-300",
  ]);
});

test("creates blocked piece", () => {
  const COLOR = 9; // BLOCKED
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-gray-600",
    "w-6",
    "h-6",
    "border",
    "border-gray-300",
  ]);
});

test("creates background piece", () => {
  const COLOR = 0; // EMPTY
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "w-6",
    "h-6",
    "border",
    "border-gray-300",
  ]);
});

test("creates small red piece", () => {
  const COLOR = 2; // RED
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
      small: true,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-red-400",
    "w-2",
    "h-2",
    "border",
    "border-gray-300",
  ]);
});

test("creates small blue piece", () => {
  const COLOR = 3; // BLUE
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
      small: true,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-blue-700",
    "w-2",
    "h-2",
    "border",
    "border-gray-300",
  ]);
});

test("creates small turquoise piece", () => {
  const COLOR = 4; // TURQUOISE
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
      small: true,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-blue-300",
    "w-2",
    "h-2",
    "border",
    "border-gray-300",
  ]);
});

test("creates small orange piece", () => {
  const COLOR = 5; // ORANGE
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
      small: true,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-yellow-500",
    "w-2",
    "h-2",
    "border",
    "border-gray-300",
  ]);
});

test("creates small green piece", () => {
  const COLOR = 6; // GREEN
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
      small: true,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-green-500",
    "w-2",
    "h-2",
    "border",
    "border-gray-300",
  ]);
});

test("creates small purple piece", () => {
  const COLOR = 7; // PURPLE
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
      small: true,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-purple-600",
    "w-2",
    "h-2",
    "border",
    "border-gray-300",
  ]);
});

test("creates small yellow piece", () => {
  const COLOR = 8; // YELLOW
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
      small: true,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-yellow-300",
    "w-2",
    "h-2",
    "border",
    "border-gray-300",
  ]);
});

test("creates small blocked piece", () => {
  const COLOR = 9; // BLOCKED
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
      small: true,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "bg-gray-600",
    "w-2",
    "h-2",
    "border",
    "border-gray-300",
  ]);
});

test("creates small background piece", () => {
  const COLOR = 0; // EMPTY
  const { container } = render(GridBox, {
    props: {
      type: COLOR,
      small: true,
    },
  });

  expect([...container.firstChild.classList.values()]).toStrictEqual([
    "w-2",
    "h-2",
    "border",
    "border-gray-300",
  ]);
});
