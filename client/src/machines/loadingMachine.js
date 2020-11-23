import { Machine } from "xstate";

export const loadingMachine = Machine({
  id: "loading",
  initial: "one",
  states: {
    one: {
      after: {
        1000: "two",
      },
    },
    two: {
      after: {
        1000: "three",
      },
    },
    three: {
      after: {
        1000: "go",
      },
    },
    go: {
      type: "final",
    },
  },
});
