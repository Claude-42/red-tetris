import { inject, provide } from "vue";

import { appMachine } from "../machines/appMachine.js";
import { useMachine } from "../composables/machine.js";

export const AppMachineSymbol = Symbol();

export function useAppMachineProvider() {
  const appMachineContext = useMachine(appMachine);

  provide(AppMachineSymbol, appMachineContext);
}

export function useAppMachineContext() {
  const context = inject(AppMachineSymbol);

  if (!context) {
    throw new Error(
      "useAppMachineContext must be used after useAppMachineProvider"
    );
  }

  const { state, send, service } = context;

  return {
    appMachineState: state,
    appMachineSend: send,
    appMachineService: service,
  };
}
