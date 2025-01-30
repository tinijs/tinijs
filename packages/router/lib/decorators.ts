import {
  getRouter,
  getActiveRoute,
  getParams,
  getSearchParams,
  getFragmentId,
  getNavIndicator,
} from './methods.js';

export function useRouter() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getRouter(),
    });
  };
}

export function useRoute() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getActiveRoute(),
    });
  };
}

export function useParams() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getParams(),
    });
  };
}

export function useSearchParams() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getSearchParams(),
    });
  };
}

export function useFragmentId() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getFragmentId(),
    });
  };
}

export function useNavIndicator() {
  return function (prototype: any, propertyName: string) {
    Object.defineProperty(prototype, propertyName, {
      get: () => getNavIndicator(),
    });
  };
}
