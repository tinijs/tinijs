import {registerGlobalHook, ComponentTypes, LifecycleHooks} from '@tinijs/core';

import {GLOBAL_TINI} from './consts.js';
import {
  getMetaTagContent,
  getLinkTagHref,
  changePageTitle,
  changePageLang,
  changeMetaTags,
} from './methods.js';
import type {
  PageWithMetadata,
  CustomizableMetadata,
  AppMetadata,
  PageMetadata,
  MetaOptions,
} from './types.js';

export const TINI_METADATA = {
  url: 'https://tinijs.dev',
  title: 'TiniJS App',
  description: 'A tiny Javascript framework.',
  image: 'https://tinijs.dev/images/featured.jpg',
  locale: 'en-US',
  lang: 'en',
  authorName: 'TiniJS',
  authorUrl: 'https://tinijs.dev/about',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  ogType: 'website',
  ogSiteName: 'TiniJS App',
  fbAppId: '000000000000000',
  twitterCard: 'summary_large_image',
  twitterCreator: '@tini_js',
  twitterSite: '@tini_js',
} as {[P in keyof AppMetadata]-?: AppMetadata[P]};

export function initMeta(options?: MetaOptions) {
  const meta = new Meta(options);
  // auto page metadata
  if (options?.autoPageMetadata) {
    registerGlobalHook(
      ComponentTypes.Page,
      LifecycleHooks.OnReady,
      ({source, app}) =>
        (app as (typeof GLOBAL_TINI)['clientApp'])?.meta?.setPageMetadata(
          (source as typeof source & PageWithMetadata).metadata,
          location.pathname === '/'
        )
    );
  }
  //result
  return meta;
}

export class Meta {
  private locale = TINI_METADATA.locale;

  private suffix?: string;
  private suffixConnector?: string;
  private suffixTranslations?: Record<string, string>;
  private metadata!: AppMetadata;
  private metadataTranslations?: Record<string, AppMetadata>;

  constructor(options: MetaOptions = {}) {
    const {
      suffix,
      suffixConnector,
      suffixTranslations,
      metadata,
      metadataTranslations,
    } = options;
    this.suffix = suffix;
    this.suffixConnector = suffixConnector;
    this.suffixTranslations = suffixTranslations;
    this.metadata = metadata || this.extractDefaultMetadata();
    this.metadataTranslations = metadataTranslations;
  }

  changeLocale(locale: string) {
    this.locale = locale;
  }

  getSuffix() {
    return (
      this.suffixTranslations?.[this.locale || TINI_METADATA.locale] ||
      this.suffix
    );
  }

  getMetadata() {
    return (
      this.metadataTranslations?.[this.locale || TINI_METADATA.locale] ||
      this.metadata
    );
  }

  setHomeMetadata() {
    return this.setPageMetadata({}, true);
  }

  setPageMetadata(pageMetadata: PageMetadata = {}, noSuffix?: boolean) {
    const customMetadata: CustomizableMetadata = pageMetadata;
    // image
    if (!customMetadata.image && pageMetadata.images) {
      customMetadata.image = (
        pageMetadata.images.xl || pageMetadata.images.default
      ).src;
    }
    // author name and url
    if (
      (!customMetadata.authorName || !customMetadata.authorUrl) &&
      pageMetadata.authors
    ) {
      const firstAuthorId = Object.keys(pageMetadata.authors)[0];
      if (firstAuthorId) {
        const author = pageMetadata.authors[firstAuthorId];
        // authorName
        if (!customMetadata.authorName) {
          customMetadata.authorName = author.name;
        }
        // authorUrl
        if (!customMetadata.authorUrl) {
          customMetadata.authorUrl = author.url;
        }
      }
    }
    // apply metadata
    const metadata = this.processMetaData(customMetadata, noSuffix);
    changePageTitle(metadata.title || TINI_METADATA.title);
    changePageLang(metadata.lang || TINI_METADATA.lang);
    changeMetaTags(metadata);
    // result
    return metadata;
  }

  private extractDefaultMetadata() {
    const url = getMetaTagContent('itemprop="url"') || TINI_METADATA.url;
    const title = getMetaTagContent('itemprop="name"') || TINI_METADATA.title;
    const description =
      getMetaTagContent('itemprop="description"') || TINI_METADATA.description;
    const image = getMetaTagContent('itemprop="image"') || TINI_METADATA.image;
    const locale =
      getMetaTagContent('itemprop="inLanguage"') || TINI_METADATA.locale;
    const lang =
      document.documentElement.getAttribute('lang') ||
      locale.split('-')[0] ||
      TINI_METADATA.lang;
    const authorName =
      getMetaTagContent('itemprop="author"') || TINI_METADATA.authorName;
    const authorUrl = getLinkTagHref('author') || TINI_METADATA.authorUrl;
    const createdAt =
      getMetaTagContent('itemprop="dateCreated"') || TINI_METADATA.createdAt;
    const updatedAt =
      getMetaTagContent('itemprop="dateModified"') || TINI_METADATA.updatedAt;
    const ogType =
      getMetaTagContent('itemprop="og:type"') || TINI_METADATA.ogType;
    const ogSiteName =
      getMetaTagContent('itemprop="og:site_name"') || TINI_METADATA.ogSiteName;
    const fbAppId =
      getMetaTagContent('itemprop="fb:app_id"') || TINI_METADATA.fbAppId;
    const twitterCard =
      getMetaTagContent('name="twitter:card"') || TINI_METADATA.twitterCard;
    const twitterCreator =
      getMetaTagContent('name="twitter:creator"') ||
      TINI_METADATA.twitterCreator;
    const twitterSite =
      getMetaTagContent('name="twitter:site"') || TINI_METADATA.twitterSite;
    return {
      url,
      title,
      description,
      image,
      locale,
      lang,
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
    };
  }

  private processMetaData(
    customMetadata: CustomizableMetadata,
    noSuffix?: boolean
  ) {
    const appSuffix = this.getSuffix();
    const appMetadata = this.getMetadata();
    // custom
    const url = customMetadata['url'] || location.href;
    let title = customMetadata['title'] || appMetadata['title'];
    // add suffix
    if (appSuffix && !noSuffix) {
      title = `${title}${this.suffixConnector || ' — '}${appSuffix}`;
    }
    const description =
      customMetadata['description'] || appMetadata['description'];
    const image = customMetadata['image'] || appMetadata['image'];
    const locale = customMetadata['locale'] || appMetadata['locale'];
    const lang =
      customMetadata['lang'] || locale?.split('-')[0] || appMetadata['lang'];
    const authorName =
      customMetadata['authorName'] || appMetadata['authorName'];
    const authorUrl = customMetadata['authorUrl'] || appMetadata['authorUrl'];
    const createdAt = customMetadata['createdAt'] || appMetadata['createdAt'];
    const updatedAt = customMetadata['updatedAt'] || appMetadata['updatedAt'];
    const ogType = customMetadata['ogType'] || appMetadata['ogType'];
    const twitterCard =
      customMetadata['twitterCard'] || appMetadata['twitterCard'];
    const twitterCreator =
      customMetadata['twitterCreator'] || appMetadata['twitterCreator'];
    // default (from index.html)
    const ogSiteName = appMetadata['ogSiteName'];
    const fbAppId = appMetadata['fbAppId'];
    const twitterSite = appMetadata['twitterSite'];
    return {
      url,
      title,
      description,
      image,
      locale,
      lang,
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
    } as AppMetadata;
  }
}
