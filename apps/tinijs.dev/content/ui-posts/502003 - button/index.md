+++json
{
  "status": "publish",
  "title": "Button",
  "category": "component"
}
+++

Use buttons to trigger actions.

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
            {label: 'Default', value: '_default', checked: true},
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
        attrs: {label: 'Scheme', preset: 'allColorsAndAllGradients'},
        target: 'scheme'
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
