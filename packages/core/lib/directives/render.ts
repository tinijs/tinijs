import {nothing, type TemplateResult} from 'lit';
import {cache} from 'lit/directives/cache.js';

export enum SectionRenderStatuses {
  Fulfilled = 'fulfilled',
  Error = 'error',
  Empty = 'empty',
  Loading = 'loading',
}

export type SectionRenderData<Type> = Type | null | undefined;
export type SectionRenderDataOrError<Type> = SectionRenderData<Type> | Error;
export interface SectionRenderTemplates<
  Dependencies extends SectionRenderDataOrError<unknown>[],
  Template = TemplateResult | typeof nothing,
> {
  main: (dependencies: Dependencies) => Template;
  error?: (dependencies: Dependencies) => Template;
  empty?: () => Template;
  loading?: () => Template;
}

function isEmptyItem(item: any) {
  return (
    item === null ||
    (item instanceof Array && !item.length) ||
    (item instanceof Map && !item.size) ||
    (item instanceof Object && !Object.keys(item).length)
  );
}

export function sectionRender<
  Dependencies extends SectionRenderDataOrError<unknown>[],
>(dependencies: Dependencies, templates: SectionRenderTemplates<Dependencies>) {
  const main = templates.main;
  const error = templates.error || nothing;
  const empty = templates.empty || nothing;
  const loading = templates.loading || nothing;
  // check status
  const status = dependencies.some(item => item instanceof Error)
    ? SectionRenderStatuses.Error
    : dependencies.every(item => item !== undefined && !isEmptyItem(item))
      ? SectionRenderStatuses.Fulfilled
      : dependencies.every(item => isEmptyItem(item))
        ? SectionRenderStatuses.Empty
        : SectionRenderStatuses.Loading;
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
