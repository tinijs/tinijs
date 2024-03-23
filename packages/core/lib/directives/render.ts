import {nothing, TemplateResult} from 'lit';
import {cache} from 'lit/directives/cache.js';

export enum RenderStatuses {
  Loading = 'loading',
  Empty = 'empty',
  Error = 'error',
  Fulfilled = 'fulfilled',
}

export type RenderData<Type> = Type | null | undefined;
export type RenderDataOrError<Type> = RenderData<Type> | Error;
export interface RenderTemplates<Template = TemplateResult | typeof nothing> {
  loading?: () => Template;
  empty?: () => Template;
  error?: (dependencies: RenderDataOrError<unknown>[]) => Template;
  main: (dependencies: RenderDataOrError<unknown>[]) => Template;
}

export function render<Type>(
  dependencies: RenderDataOrError<unknown>[],
  templates: RenderTemplates<Type>
) {
  const main = templates.main;
  const loading = templates.loading || nothing;
  const empty = templates.empty || nothing;
  const error = templates.error || nothing;
  // check status
  const status = dependencies.every(item => item === undefined)
    ? RenderStatuses.Loading
    : dependencies.every(
          item =>
            item === null ||
            (item instanceof Array && !item.length) ||
            (item instanceof Map && !item.size) ||
            (item instanceof Object && !Object.keys(item).length)
        )
      ? RenderStatuses.Empty
      : dependencies.some(item => item instanceof Error)
        ? RenderStatuses.Error
        : RenderStatuses.Fulfilled;
  // render template accordingly
  return cache(
    status === RenderStatuses.Loading
      ? loading instanceof Function
        ? loading()
        : loading
      : status === RenderStatuses.Empty
        ? empty instanceof Function
          ? empty()
          : empty
        : status === RenderStatuses.Error
          ? error instanceof Function
            ? error(dependencies)
            : error
          : main instanceof Function
            ? main(dependencies)
            : main
  );
}
