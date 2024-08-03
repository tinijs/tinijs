import {html, css, nothing} from 'lit';

import {Component, TiniComponent, Input} from '@tinijs/core';

import {AppComponentEditorComponent} from '../../../app/components/component-editor/index.js';

const SRC =
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=350&q=80';

const SRC_ITEM = {target: 'src', value: SRC};

const SHAPE_ITEMS = [
  {content: 'Default', value: '_default'},
  {content: 'Square', value: 'square'},
  {content: 'Rounded square', value: 'rounded-square'},
  {content: 'Squircle', value: 'squircle'},
  {content: 'Circle', value: 'circle'},
  {content: 'Rectangle', value: 'rectangle'},
  {content: 'Vertical rectangle', value: 'vertical-rectangle'},
  {content: 'Rounded rectangle', value: 'rounded-rectangle'},
  {content: 'Rounded vertical rectangle', value: 'rounded-vertical-rectangle'},
  {content: 'Pill', value: 'pill'},
  {content: 'Vertical pill', value: 'vertical-pill'},
  {content: 'Ellipse', value: 'ellipse'},
  {content: 'Vertical ellipse', value: 'vertical-ellipse'},
  {content: 'Hexagon', value: 'hexagon'},
  {content: 'Rounded hexagon', value: 'rounded-hexagon'},
  {content: 'Triangle', value: 'triangle'},
  {content: 'Rounded triangle', value: 'rounded-triangle'},
];

@Component({
  components: [AppComponentEditorComponent],
})
export class ContentUIPostImageComponent extends TiniComponent {
  static readonly defaultTagName = 'content-ui-post-image';

  @Input() block!: string;

  onCreate() {
    if (!this.block) throw new Error('block is required');
  }

  protected render() {
    switch (this.block) {
      case 'editor':
        return this.renderEditorBlock();
      default:
        return nothing;
    }
  }

  private renderEditorBlock() {
    return html`
      <app-component-editor
        name="image"
        .examples=${{
          'width-height': {
            content: 'Width and height',
            items: [
              SRC_ITEM,
              {target: 'width', value: '250px'},
              {target: 'height', value: '250px'},
            ],
          },
          ratio: {
            content: 'Aspect ratio',
            items: [SRC_ITEM, {target: 'ratio', value: '21/9'}],
          },
          'border-radius': {
            content: 'Border radius',
            items: [SRC_ITEM, {target: 'radius', value: 'half'}],
          },
          'padding-border': {
            content: 'Padding and border',
            items: [
              SRC_ITEM,
              {target: 'padding', value: 'lg'},
              {target: 'border', value: 'md solid medium'},
            ],
          },
          'background-filter-blend': {
            content: 'Background, filter and blend',
            items: [
              SRC_ITEM,
              {
                target: 'background',
                value: 'linear-gradient(90deg, red, blue)',
              },
              {target: 'innerOpacity', value: '0.5'},
              {target: 'blend', value: 'multiply'},
            ],
          },
          shape: {
            content: 'Shape',
            items: [SRC_ITEM, {target: 'shape', value: 'hexagon'}],
          },
          'shape-both': {
            content: 'Shape both outer and inner',
            items: [
              SRC_ITEM,
              {target: 'shape', value: 'squircle'},
              {target: 'background', value: 'medium'},
              {target: 'padding', value: 'xl'},
              {target: 'innerShape', value: 'rounded-hexagon'},
            ],
          },
          clip: {
            content: 'Clip',
            items: [
              SRC_ITEM,
              {
                target: 'clip',
                value: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
              },
            ],
          },
          mask: {
            content: 'Mask',
            items: [
              SRC_ITEM,
              {target: 'ratio', value: '1'},
              {
                target: 'mask',
                value:
                  'radial-gradient(circle, black 0%, black 50%, transparent 70%)',
              },
            ],
          },
        }}
        .sections=${[
          {
            section: 'html',
            attrs: {label: 'SRC'},
            target: 'src',
            value: SRC,
          },
          {
            section: 'select',
            attrs: {
              label: 'Pre-defined shape',
              items: SHAPE_ITEMS,
            },
            target: 'shape',
          },
          {
            section: 'select',
            attrs: {
              label: 'Inner shape',
              items: SHAPE_ITEMS,
            },
            target: 'innerShape',
          },
          {
            section: 'input',
            attrs: {label: 'Aspect ratio', placeholder: '16/9, 1, ...'},
            target: 'ratio',
          },
          {
            section: 'input',
            attrs: {label: 'Width', placeholder: '50px, 10rem, 50%'},
            target: 'width',
          },
          {
            section: 'input',
            attrs: {label: 'Height', placeholder: '50px, 10rem, 50%'},
            target: 'height',
          },
          {
            section: 'input',
            attrs: {
              label: 'Transform',
              placeholder: 'translateX(10px), rotate(10deg), ...',
            },
            target: 'transform',
          },
          {
            section: 'select',
            attrs: {
              label: 'Fit',
              items: [
                {content: 'Default', value: '_default'},
                {content: 'Fill', value: 'fill'},
                {content: 'Contain', value: 'contain'},
                {content: 'Cover', value: 'cover'},
                {content: 'None', value: 'none'},
                {content: 'Scale down', value: 'scale-down'},
              ],
            },
            target: 'fit',
          },
          {
            section: 'input',
            attrs: {
              label: 'Background',
              placeholder: 'primary, linear-gradient(), ...',
            },
            target: 'background',
          },
          {
            section: 'input',
            attrs: {label: 'Padding', placeholder: 'md, 6px, ...'},
            target: 'padding',
          },
          {
            section: 'input',
            attrs: {
              label: 'Border',
              placeholder: 'md solid, 3px solid success, ...',
            },
            target: 'border',
          },
          {
            section: 'select',
            attrs: {label: 'Radius', preset: 'radiuses'},
            target: 'radius',
          },
          {
            section: 'select',
            attrs: {label: 'Inner radius', preset: 'radiuses'},
            target: 'innerRadius',
          },
          {
            section: 'select',
            attrs: {label: 'Shadow', preset: 'shadows'},
            target: 'shadow',
          },
          {
            section: 'input',
            attrs: {label: 'Opacity', placeholder: '0.5, 0.75, ...'},
            target: 'opacity',
          },
          {
            section: 'input',
            attrs: {label: 'Inner opacity', placeholder: '0.5, 0.75, ...'},
            target: 'innerOpacity',
          },
          {
            section: 'input',
            attrs: {label: 'Backdrop', placeholder: 'blur(3px), ...'},
            target: 'backdrop',
          },
          {
            section: 'input',
            attrs: {label: 'Filter', placeholder: 'Filters'},
            target: 'filter',
          },
          {
            section: 'input',
            attrs: {label: 'Inner filter', placeholder: 'Inner filters'},
            target: 'innerFilter',
          },
          {
            section: 'select',
            attrs: {
              label: 'Blend',
              items: [
                {content: 'Default', value: '_default'},
                {content: 'Normal', value: 'normal'},
                {content: 'Multiply', value: 'multiply'},
                {content: 'Screen', value: 'screen'},
                {content: 'Overlay', value: 'overlay'},
                {content: 'Darken', value: 'darken'},
                {content: 'Lighten', value: 'lighten'},
                {content: 'Color dodge', value: 'color-dodge'},
                {content: 'Color burn', value: 'color-burn'},
                {content: 'Hard light', value: 'hard-light'},
                {content: 'Soft light', value: 'soft-light'},
                {content: 'Difference', value: 'difference'},
                {content: 'Exclusion', value: 'exclusion'},
                {content: 'Hue', value: 'hue'},
                {content: 'Saturation', value: 'saturation'},
                {content: 'Color', value: 'color'},
                {content: 'Luminosity', value: 'luminosity'},
                {content: 'Plus darker', value: 'plus-darker'},
                {content: 'Plus lighter', value: 'plus-lighter'},
              ],
            },
            target: 'blend',
          },
          {
            section: 'input',
            attrs: {label: 'Clip path', placeholder: 'path(), xywh(), ...'},
            target: 'clip',
          },
          {
            section: 'input',
            attrs: {
              label: 'Inner clip path',
              placeholder: 'match, path(), ...',
            },
            target: 'innerClip',
          },
          {
            section: 'input',
            attrs: {
              label: 'Mask',
              placeholder: 'squircle, rounded-hexagon, ...',
            },
            target: 'mask',
          },
          {
            section: 'input',
            attrs: {label: 'Inner mask', placeholder: 'match, squircle, ...'},
            target: 'innerMask',
          },
          {
            section: 'css',
            attrs: {
              label: 'Style deep',
              placeholder: ':host, .main {\n  key: value;\n}',
            },
            target: 'styleDeep',
          },
        ]}
      ></app-component-editor>
    `;
  }

  static styles = css``;
}
