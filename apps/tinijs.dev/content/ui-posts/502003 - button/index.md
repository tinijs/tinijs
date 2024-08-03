+++json
{
  "status": "publish",
  "title": "Button",
  "category": "components"
}
+++

Use buttons to trigger actions.

## Import

<app-component-import componentName="button"></app-component-import>

## Editor

{%
  app 'component-editor', {
    name: 'button',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'Button'
      },
      {
        section: 'radios',
        attrs: {
          label: 'Mode',
          items: [
            {label: 'Default', value: '_default', activated: true},
            {label: 'Filled', value: 'filled'}
          ]
        },
        target: 'mode'
      },
      {
        section: 'switch',
        attrs: {label: 'Block'},
        target: 'block'
      },
      {
        section: 'switch',
        attrs: {label: 'Disabled'},
        target: 'disabled'
      },
      {
        section: 'select',
        attrs: {label: 'Color', preset: 'schemableColors'},
        target: 'color'
      },
      {
        section: 'select',
        attrs: {label: 'Gradient', preset: 'schemableGradients'},
        target: 'gradient'
      },
      {
        section: 'select',
        attrs: {label: 'Size', preset: 'sizes'},
        target: 'size'
      },
      {
        section: 'css',
        attrs: {
          label: 'Style deep',
          placeholder: ':host, .main, .any { ... }'
        },
        target: 'styleDeep'
      }
    ]
  }
%}{% endapp %}
