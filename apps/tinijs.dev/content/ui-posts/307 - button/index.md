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
        section: 'radios',
        attrs: {
          label: 'Mode',
          items: [
            {label: 'Default', value: '_default', checked: true},
            {label: 'Outline', value: 'outline'},
            {label: 'Clear', value: 'clear'}
          ]
        },
        target: 'mode'
      },
      {
        section: 'switch',
        attrs: {
          label: 'Block'
        },
        target: 'block'
      },
      {
        section: 'select',
        attrs: {
          label: 'Scheme',
          preset: 'colorsAndGradients'
        },
        target: 'scheme'
      },
      {
        section: 'select',
        attrs: {
          label: 'Scale',
          preset: 'scales'
        },
        target: 'scale'
      },
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'Button'
      }
    ]
  }
%}{% endapp %}
