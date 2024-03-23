import {NO_REGISTER_ERROR} from '../consts/error.js';

import {getDIRegistry} from '../utils/di.js';

export function Inject(id?: string) {
  return function (prototype: any, propertyName: string) {
    const depId = (id || propertyName) as string;
    const dependencyRegistry = getDIRegistry();
    // the pending
    const pending = async () => {
      let result = dependencyRegistry.instances.get(depId);
      if (!result) {
        const register = dependencyRegistry.registers.get(depId);
        if (!register) throw NO_REGISTER_ERROR(depId);
        result = dependencyRegistry.instances
          .set(depId, await register())
          .get(depId);
      }
      return result;
    };
    // queue the dependencies
    const theRegister = dependencyRegistry.registers.get(depId);
    prototype.pendingDependencies ||= [];
    if (!theRegister) {
      let resolveSchedule = () => {};
      const scheduledPending = new Promise(
        resolve => (resolveSchedule = resolve as any)
      );
      dependencyRegistry.awaiters.push(() => resolveSchedule());
      prototype.pendingDependencies.push(() =>
        scheduledPending.then(() => pending())
      );
    } else {
      prototype.pendingDependencies.push(pending);
    }
    // result
    Object.defineProperty(prototype, propertyName, {
      get: () => dependencyRegistry.instances.get(depId),
    });
  };
}

export function Vendor(id?: string) {
  return Inject(id);
}
