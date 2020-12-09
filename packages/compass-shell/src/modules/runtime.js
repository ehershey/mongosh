// import { ElectronRuntime } from '@mongosh/browser-runtime-electron';
// import { CompassServiceProvider } from '@mongosh/service-provider-server';

import WorkerRuntime from './worker-runtime/runtime';

/**
 * The prefix.
 */
const PREFIX = 'shell/runtime';

/**
 * Data service connected.
 */
export const SETUP_RUNTIME = `${PREFIX}/SETUP_RUNTIME`;

/**
 * The initial state.
 */
export const INITIAL_STATE = {
  error: null,
  dataService: null,
  runtime: null
};

/**
 * Reducer function for handling data service connected actions.
 *
 * @param {Object} state - The data service state.
 * @param {Object} action - The action.
 *
 * @returns {String} The new state.
 */
export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === SETUP_RUNTIME) {
    return reduceSetupRuntime(state, action);
  }

  return state;
}

function reduceSetupRuntime(state, action) {
  if (action.error || !action.dataService) {
    return { error: action.error, dataService: null, runtime: null };
  }

  if (state.dataService === action.dataService) {
    return state;
  }

  // const runtime = new ElectronRuntime(
  //   CompassServiceProvider.fromDataService(action.dataService),
  //   action.appRegistry
  // );

  // const origEval = runtime.evaluate;

  // runtime.evaluate = async function _evaluate(...args) {
  //   console.info("input:", ...args);
  //   const result = await origEval.call(runtime, ...args);
  //   console.info("output:", result);
  //   return result;
  // };

  if (state.runtime) {
    state.runtime.terminate();
  }

  const { url, options } = action.dataService.getConnectionParams();
  const newRuntime = new WorkerRuntime(url, options);

  return {
    error: action.error,
    dataService: action.dataService,
    runtime: newRuntime,
  };
}

/**
 * Setup the shell runtime with the supplied dataService instance.
 *
 * @param {Error} error - The connection error.
 * @param {DataService} dataService - The data service.
 * @param {EventEmitter} appRegistry - A message bus for runtime events.
 *
 * @returns {Object} The data service connected action.
 */
export const setupRuntime = (error, dataService, appRegistry) => ({
  type: SETUP_RUNTIME,
  error,
  dataService,
  appRegistry,
});
