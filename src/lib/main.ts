import {LitElement} from 'lit';
import {property} from 'lit/decorators/property.js';
import {ClassInfo} from 'lit/directives/class-map.js';
import {StyleInfo} from 'lit/directives/style-map.js';

import {
  ConstructorArgs,
  TiniElementConstructor,
  Transform,
  PartInfo,
} from './types';
import {transformToStyleInfo} from './methods';
import {Displays, Positions} from './varies';

function TiniElementMixin(SuperClass: any) {
  class TiniElement extends SuperClass {
    rootClassesParts: ClassInfo | PartInfo = {};
    rootStyles: StyleInfo = {};

    /* eslint-disable prettier/prettier */
    @property({type: String, reflect: true}) declare display?: Displays;
    @property({type: String, reflect: true}) declare position?: Positions;
    @property({type: String, reflect: true}) declare top?: string;
    @property({type: String, reflect: true}) declare right?: string;
    @property({type: String, reflect: true}) declare bottom?: string;
    @property({type: String, reflect: true}) declare left?: string;
    @property({type: String, reflect: true}) declare margin?: string;
    @property({type: String, reflect: true}) declare padding?: string;
    @property({type: String, reflect: true}) declare transition?: string;
    @property({type: String, reflect: true}) declare animation?: string;
    @property({type: String, reflect: true}) declare filter?: string;
    @property({type: String, reflect: true}) declare transform?: Transform;
    /* eslint-enable prettier/prettier */

    private currentTransforms?: StyleInfo;

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
      // host styles
      this.updateHostStyles();
      // root styles
      this.rootStyles = {
        transition: this.transition,
        animation: this.animation,
        filter: this.filter,
      };
    }

    private updateHostStyles() {
      this.style.display = !this.display ? '' : this.display;
      this.style.position = !this.position ? '' : this.position;
      this.style.top = !this.top ? '' : this.top;
      this.style.right = !this.right ? '' : this.right;
      this.style.bottom = !this.bottom ? '' : this.bottom;
      this.style.left = !this.left ? '' : this.left;
      this.style.margin = !this.margin ? '' : this.margin;
      this.style.padding = !this.padding ? '' : this.padding;
      if (this.transform) {
        this.currentTransforms = transformToStyleInfo(this.transform);
        Object.keys(this.currentTransforms).forEach(
          key => (this.style[key] = this.currentTransforms![key])
        );
        this.style.webkitFilter = 'blur(0px)';
      } else if (this.currentTransforms) {
        Object.keys(this.currentTransforms).forEach(
          key => (this.style[key] = '')
        );
        this.style.webkitFilter = '';
      }
    }
  }
  return TiniElement as unknown as TiniElementConstructor;
}

export const TiniElement = TiniElementMixin(LitElement);
