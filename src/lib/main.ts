import {LitElement} from 'lit';
import {property} from 'lit/decorators';
import {ClassInfo} from 'lit/directives/class-map.js';
import {StyleInfo} from 'lit/directives/style-map.js';

import {
  ConstructorArgs,
  TiniElementConstructor,
  Transform,
  PartInfo,
} from './types';
import {transformToStyleInfo} from './methods';

function TiniElementMixin(SuperClass: any) {
  class TiniElement extends SuperClass {
    rootClassesParts: ClassInfo | PartInfo = {};
    rootStyles: StyleInfo = {};

    /* eslint-disable prettier/prettier */
    @property({type: String, reflect: true}) declare transform?: Transform;
    @property({type: String, reflect: true}) declare filter?: string;
    /* eslint-enable prettier/prettier */

    constructor(...args: ConstructorArgs) {
      super(...args);
    }

    extendRootClassesParts(info: ClassInfo | PartInfo) {
      return (this.rootClassesParts = {...this.rootClassesParts, ...info});
    }

    extendRootStyles(info: StyleInfo) {
      return (this.rootStyles = {...this.rootStyles, ...info});
    }

    willUpdate() {
      // root classes and parts
      this.rootClassesParts = {root: true};
      // root styles
      this.rootStyles = {
        ...transformToStyleInfo(this.transform),
        filter: this.filter,
      };
      if (this.transform) {
        this.style.webkitFilter = 'blur(0px)';
      }
    }
  }
  return TiniElement as unknown as TiniElementConstructor;
}

export const TiniElement = TiniElementMixin(LitElement);
