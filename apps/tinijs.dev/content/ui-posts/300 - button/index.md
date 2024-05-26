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
            {label: 'Normal', value: 'normal'},
            {label: 'Outline', value: 'outline'},
            {label: 'Clear', value: 'clear'}
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
        attrs: {label: 'Scheme (hover)', preset: 'allColorsAndAllGradients'},
        target: 'hoverScheme'
      },
      {
        section: 'select',
        attrs: {label: 'Scale', preset: 'scales'},
        target: 'scale'
      },
      {
        section: 'css',
        attrs: {
          label: 'Style deep',
          placeholder: ':host, .root, .any { ... }'
        },
        target: 'styleDeep'
      }
    ]
  }
%}{% endapp %}
