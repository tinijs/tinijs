import {css} from 'lit';

import {type ThemingScripts} from '@tinijs/core';

import {defaultStyles} from '../../../components/button.js';

const cleanupRipple = (elem: HTMLElement) => {
  const lastRippleElem = (elem as any).lastRippleElem;
  if (lastRippleElem) lastRippleElem.remove();
};

const rippleEffect = (e: MouseEvent) => {
  const elem = e.target as HTMLElement;
  const {clientX, clientY} = e;
  const {width, height, top, left} = elem.getBoundingClientRect();
  // create a ripple element
  const diameter = Math.max(width, height);
  const radius = diameter / 2;
  const rippleElem = document.createElement('div');
  rippleElem.style.width = rippleElem.style.height = `${diameter}px`;
  rippleElem.style.left = `${clientX - left - radius}px`;
  rippleElem.style.top = `${clientY - top - radius}px`;
  rippleElem.classList.add('ripple');
  // activate the ripple effect
  cleanupRipple(elem);
  elem.shadowRoot!.appendChild(((elem as any).lastRippleElem = rippleElem));
};

export const scripts: ThemingScripts = {
  activate: elem => {
    elem.addEventListener('click', rippleEffect);
  },
  deactivate: elem => {
    cleanupRipple(elem);
    elem.removeEventListener('click', rippleEffect);
  },
};

export const styles = defaultStyles.extends({
  statics: css`
    :host {
      outline: none;
      transition: box-shadow 0.25s ease;
    }

    :host(:focus-visible),
    :host(:hover) {
      box-shadow: var(--shadow-md);
    }

    :host(:active) {
      box-shadow: none;
    }

    :host(:hover) .bg {
      filter: brightness(105%);
    }

    .main {
      padding: calc(var(--size) * 0.5) var(--size);
      font-size: calc(var(--size) * 0.9);
      z-index: 2;
    }

    .ripple {
      z-index: 1;
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.35s linear;
      background: color-mix(in oklab, var(--color), transparent 80%);
    }

    @keyframes ripple {
      to {
        transform: scale(3);
        opacity: 0;
      }
    }
  `,
  colorGen: () => '',
  gradientGen: () => '',
  sizeGen: () => '',
});

export default {scripts, styles};
