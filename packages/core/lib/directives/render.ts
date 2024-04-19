import {nothing, type TemplateResult} from 'lit';
import {cache} from 'lit/directives/cache.js';

export enum SectionRenderStatuses {
  Loading = 'loading',
  Empty = 'empty',
  Error = 'error',
  Fulfilled = 'fulfilled',
}

export type SectionRenderData<Type> = Type | null | undefined;
export type SectionRenderDataOrError<Type> = SectionRenderData<Type> | Error;
export interface SectionRenderTemplates<
  Dependencies extends SectionRenderDataOrError<unknown>[],
  Template = TemplateResult | typeof nothing,
> {
  loading?: () => Template;
  empty?: () => Template;
  error?: (dependencies: Dependencies) => Template;
  main: (dependencies: Dependencies) => Template;
}

export function sectionRender<
  Dependencies extends SectionRenderDataOrError<unknown>[],
>(dependencies: Dependencies, templates: SectionRenderTemplates<Dependencies>) {
  const main = templates.main;
  const loading = templates.loading || nothing;
  const empty = templates.empty || nothing;
  const error = templates.error || nothing;
  // check status
  const status = dependencies.every(item => item === undefined)
    ? SectionRenderStatuses.Loading
    : dependencies.every(
          item =>
            item === null ||
            (item instanceof Array && !item.length) ||
            (item instanceof Map && !item.size) ||
            (item instanceof Object && !Object.keys(item).length)
        )
      ? SectionRenderStatuses.Empty
      : dependencies.some(item => item instanceof Error)
        ? SectionRenderStatuses.Error
        : SectionRenderStatuses.Fulfilled;
  // render template accordingly
  return cache(
    status === SectionRenderStatuses.Loading
      ? loading instanceof Function
        ? loading()
        : loading
      : status === SectionRenderStatuses.Empty
        ? empty instanceof Function
          ? empty()
          : empty
        : status === SectionRenderStatuses.Error
          ? error instanceof Function
            ? error(dependencies)
            : error
          : main instanceof Function
            ? main(dependencies)
            : main
  );
}
