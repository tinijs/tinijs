+++json
{
  "status": "publish",
  "title": "Badge",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'badge',
    sections: [
      {
        section: 'input',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: '999+'
      },
      {
        section: 'radios',
        attrs: {
          label: 'Mode',
          items: [
            {label: 'Default', value: '_default', checked: true},
            {label: 'Pill', value: 'pill'},
            {label: 'Circle', value: 'circle'}
          ]
        },
        target: 'mode'
      },
      {
        section: 'select',
        attrs: {label: 'Scheme', preset: 'colorsAndGradients'},
        target: 'scheme'
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
