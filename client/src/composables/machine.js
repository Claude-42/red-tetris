/**
 * Code imported from https://github.com/davidkpiano/xstate/blob/master/packages/xstate-vue/src/index.ts
 * We could not use @xstate/vue library because they use @vue/composition-api when we use Vue 3 directly.
 */

import { shallowRef, onMounted, onBeforeUnmount, isRef, watch } from "vue";
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
    delays,
  };

  const createdMachine = machine.withConfig(machineConfig, {
    ...machine.context,
    ...context,
  });

  const service = interpret(createdMachine, interpreterOptions).start(
    rehydratedState ? State.create(rehydratedState) : undefined
  );

  const state = shallowRef(service.state);

  onMounted(() => {
    service.onTransition((currentState) => {
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

export function useService(service) {
  const serviceRef = isRef(service) ? service : shallowRef(service);
  const state = shallowRef(serviceRef.value.state);

  watch(
    serviceRef,
    (service, _, onCleanup) => {
      state.value = service.state;
      const { unsubscribe } = service.subscribe((currentState) => {
        if (currentState.changed) {
          state.value = currentState;
        }
      });
      onCleanup(() => unsubscribe());
    },
    {
      immediate: true,
    }
  );

  const send = (event) => serviceRef.value.send(event);

  return { state, send, service: serviceRef };
}
