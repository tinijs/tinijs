import {Meta} from './main.js';

export interface MetaOptions {
  autoPageMetadata?: boolean;
  suffix?: string;
  suffixTranslations?: Record<string, string>;
  metadata?: AppMetadata;
  metadataTranslations?: Record<string, AppMetadata>;
  suffixConnector?: string;
}

export interface MetaTagDefinition {
  charset?: string;
  content?: string;
  httpEquiv?: string;
  id?: string;
  itemprop?: string;
  name?: string;
  property?: string;
  scheme?: string;
  url?: string;
  [prop: string]: undefined | string;
}

export interface CustomizableMetadata {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  locale?: string;
  lang?: string;
  authorName?: string;
  authorUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  ogType?: string;
  twitterCard?: string;
  twitterCreator?: string;
}

export interface AppMetadata extends CustomizableMetadata {
  ogSiteName?: string;
  fbAppId?: string;
  twitterSite?: string;
}

export interface PageMetadata extends CustomizableMetadata {
  images?: Record<string, {name: string; src: string}>;
  authors?: Record<string, {name: string; url: string}>;
}

export interface MetaTranslations {
  [locale: string]: AppMetadata;
}

export interface AppWithMeta {
  meta: Meta;
}

export interface PageWithMetadata {
  metadata: PageMetadata;
}
