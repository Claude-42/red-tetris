import { shallowRef, onMounted, onBeforeUnmount } from "vue";
import { interpret, State } from "xstate";

export function useMachine(machine, options = {}) {
  const {
    context,
    guards,
    actions,
    activities,
    services,
    delays,
    state: rehydratedState,
    ...interpreterOptions
  } = options;

  const machineConfig = {
    context,
    guards,
    actions,
    activities,
    services,
    delays
  };

  const createdMachine = machine.withConfig(machineConfig, {
    ...machine.context,
    ...context
  });

  const service = interpret(createdMachine, interpreterOptions).start(
    rehydratedState ? State.create(rehydratedState) : undefined
  );

  const state = shallowRef(service.state);

  onMounted(() => {
    service.onTransition(currentState => {
      if (currentState.changed) {
        state.value = currentState;
      }
    });

    state.value = service.state;
  });

  onBeforeUnmount(() => {
    service.stop();
  });

  return { state, send: service.send, service };
}
