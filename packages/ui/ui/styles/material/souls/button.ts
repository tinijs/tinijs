import {css} from 'lit';

import {type ThemingScripts} from '@tinijs/core';

import {defaultStyles} from '../../../elements/button.js';

const cleanupRipple = (element: HTMLElement) => {
  const lastRippleElement = (element as any).lastRippleElement;
  if (lastRippleElement) lastRippleElement.remove();
};

const rippleEffect = (e: MouseEvent) => {
  const element = e.target as HTMLElement;
  const {clientX, clientY} = e;
  const {width, height, top, left} = element.getBoundingClientRect();
  // create a ripple element
  const diameter = Math.max(width, height);
  const radius = diameter / 2;
  const rippleElement = document.createElement('div');
  rippleElement.style.width = rippleElement.style.height = `${diameter}px`;
  rippleElement.style.left = `${clientX - left - radius}px`;
  rippleElement.style.top = `${clientY - top - radius}px`;
  rippleElement.classList.add('ripple');
  // activate the ripple effect
  cleanupRipple(element);
  element.shadowRoot!.appendChild(
    ((element as any).lastRippleElement = rippleElement)
  );
};

export const scripts: ThemingScripts = {
  activate: element => {
    element.addEventListener('click', rippleEffect);
  },
  deactivate: element => {
    cleanupRipple(element);
    element.removeEventListener('click', rippleEffect);
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
