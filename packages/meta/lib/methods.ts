import type {MetaTagDefinition, AppMetadata} from './types.js';
import {GLOBAL_TINI, NO_META_ERROR} from './consts.js';

export function getMeta() {
  if (!GLOBAL_TINI.clientApp?.meta) throw new Error(NO_META_ERROR);
  return GLOBAL_TINI.clientApp.meta;
}

/*
 * Ngx-useful Meta: https://github.com/lamnhan/ngx-useful/blob/main/projects/useful/src/lib/services/meta/meta.service.ts
 */

export function getMetaTagContent(attrSelector: string) {
  return document
    .querySelector(`meta[${attrSelector}]`)
    ?.getAttribute('content');
}

export function getLinkTagHref(rel: string) {
  return document.querySelector(`link[rel="${rel}"]`)?.getAttribute('href');
}

export function changePageTitle(title: string) {
  return (document.title = title || '');
}

export function changePageLang(code: string) {
  return document.documentElement.setAttribute('lang', code);
}

export function changeLinkTags(items: Array<{rel: string; href: string}>) {
  for (const item of items) {
    const {rel, href} = item;
    let node = document.querySelector(`link[rel=${rel}]`);
    if (!node) {
      // create
      node = document.createElement('link');
      node.setAttribute('rel', rel);
      node.setAttribute('href', href);
      document.head.appendChild(node);
    } else {
      // update
      node.setAttribute('href', href);
    }
  }
}

export function changeMetaTags(metadata: AppMetadata) {
  const {
    url,
    title,
    description,
    image,
    locale,
    authorName,
    authorUrl,
    createdAt,
    updatedAt,
    ogType,
    ogSiteName,
    fbAppId,
    twitterCard,
    twitterCreator,
    twitterSite,
  } = metadata;
  // update links and meta
  if (url) {
    removeMetaTag('itemprop="url"');
    changeLinkTags([{rel: 'canonical', href: url}]);
    updateMetaTag({itemprop: 'url', content: url});
    updateMetaTag({property: 'og:url', content: url});
  }
  if (title) {
    removeMetaTag('itemprop="name"');
    updateMetaTag({itemprop: 'name', content: title});
    updateMetaTag({property: 'og:title', content: title});
  }
  if (description) {
    removeMetaTag('itemprop="description"');
    updateMetaTag({name: 'description', content: description});
    updateMetaTag({itemprop: 'description', content: description});
    updateMetaTag({property: 'og:description', content: description});
  }
  if (image) {
    removeMetaTag('itemprop="image"');
    updateMetaTag({itemprop: 'image', content: image});
    updateMetaTag({property: 'og:image', content: image});
  }
  if (locale) {
    removeMetaTag('itemprop="inLanguage"');
    updateMetaTag({itemprop: 'inLanguage', content: locale});
    updateMetaTag({property: 'og:locale', content: locale});
  }
  if (authorName) {
    removeMetaTag('itemprop="author"');
    updateMetaTag({itemprop: 'author', content: authorName});
  }
  if (authorUrl) {
    changeLinkTags([{rel: 'author', href: authorUrl}]);
  }
  if (createdAt) {
    removeMetaTag('itemprop="dateCreated"');
    removeMetaTag('itemprop="datePublished"');
    updateMetaTag({itemprop: 'dateCreated', content: createdAt});
    updateMetaTag({itemprop: 'datePublished', content: createdAt});
  }
  if (updatedAt) {
    removeMetaTag('itemprop="dateModified"');
    updateMetaTag({itemprop: 'dateModified', content: updatedAt});
  }
  if (ogType) {
    updateMetaTag({property: 'og:type', content: ogType});
  }
  if (ogSiteName) {
    updateMetaTag({property: 'og:site_name', content: ogSiteName});
  }
  if (fbAppId) {
    updateMetaTag({property: 'fb:app_id', content: fbAppId});
  }
  if (twitterCard) {
    updateMetaTag({name: 'twitter:card', content: twitterCard});
  }
  if (twitterCreator) {
    updateMetaTag({name: 'twitter:creator', content: twitterCreator});
  }
  if (twitterSite) {
    updateMetaTag({name: 'twitter:site', content: twitterSite});
  }
}

/*
 * Angular Meta: https://github.com/angular/angular/blob/15.0.4/packages/platform-browser/src/browser/meta.ts
 */

export function addMetaTag(
  tag: MetaTagDefinition,
  forceCreation = false
): HTMLMetaElement | null {
  if (!tag) return null;
  return _getOrCreateElement(tag, forceCreation);
}

export function addMetaTags(
  tags: MetaTagDefinition[],
  forceCreation = false
): HTMLMetaElement[] {
  if (!tags) return [];
  return tags.reduce((result: HTMLMetaElement[], tag: MetaTagDefinition) => {
    if (tag) {
      result.push(_getOrCreateElement(tag, forceCreation));
    }
    return result;
  }, []);
}

export function getMetaTag(attrSelector: string): HTMLMetaElement | null {
  if (!attrSelector) return null;
  return document.querySelector(`meta[${attrSelector}]`) || null;
}

export function getMetaTags(attrSelector: string): HTMLMetaElement[] {
  if (!attrSelector) return [];
  const list /*NodeList*/ = document.querySelectorAll(`meta[${attrSelector}]`);
  return list ? [].slice.call(list) : [];
}

export function updateMetaTag(
  tag: MetaTagDefinition,
  selector?: string
): HTMLMetaElement | null {
  if (!tag) return null;
  selector = selector || _parseSelector(tag);
  const meta: HTMLMetaElement = getMetaTag(selector)!;
  if (meta) {
    return _setMetaElementAttributes(tag, meta);
  }
  return _getOrCreateElement(tag, true);
}

export function removeMetaTag(attrSelector: string): void {
  _removeTagElement(getMetaTag(attrSelector)!);
}

function _removeTagElement(meta: HTMLMetaElement): void {
  if (meta) {
    meta.remove();
  }
}

function _setMetaElementAttributes(
  tag: MetaTagDefinition,
  el: HTMLMetaElement
): HTMLMetaElement {
  Object.keys(tag).forEach((prop: string) =>
    el.setAttribute(_getMetaKeyMap(prop), tag[prop] as string)
  );
  return el;
}

function _parseSelector(tag: MetaTagDefinition): string {
  const attr: string = tag.name ? 'name' : 'property';
  return `${attr}="${tag[attr]}"`;
}

function _containsAttributes(
  tag: MetaTagDefinition,
  elem: HTMLMetaElement
): boolean {
  return Object.keys(tag).every(
    (key: string) => elem.getAttribute(_getMetaKeyMap(key)) === tag[key]
  );
}

function _getMetaKeyMap(prop: string): string {
  const META_KEYS_MAP: {[prop: string]: string} = {
    httpEquiv: 'http-equiv',
  };
  return META_KEYS_MAP[prop] || prop;
}

function _getOrCreateElement(
  meta: MetaTagDefinition,
  forceCreation = false
): HTMLMetaElement {
  if (!forceCreation) {
    const selector: string = _parseSelector(meta);
    const elem = getMetaTags(selector).filter(elem =>
      _containsAttributes(meta, elem)
    )[0];
    if (elem !== undefined) return elem;
  }
  const element: HTMLMetaElement = document.createElement(
    'meta'
  ) as HTMLMetaElement;
  _setMetaElementAttributes(meta, element);
  const head = document.getElementsByTagName('head')[0];
  head.appendChild(element);
  return element;
}
