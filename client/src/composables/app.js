import { inject, provide } from "vue";

import { appMachine } from "../machines/appMachine.js";
import { useMachine } from "../composables/machine.js";

export const AppMachineSymbol = Symbol("app-machine");

export function useProvideAppMachine() {
  const appMachineContext = useMachine(appMachine);

  provide(AppMachineSymbol, appMachineContext);
}

export function useAppMachine() {
  const { state, send, service } = inject(AppMachineSymbol);

  return {
    appMachineState: state,
    appMachineSend: send,
    appMachineService: service,
  };
}
