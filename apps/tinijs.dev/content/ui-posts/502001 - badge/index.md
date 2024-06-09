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
          label: 'Shape',
          items: [
            {label: 'Default', value: '_default', checked: true},
            {label: 'Pill', value: 'pill'},
            {label: 'Circle', value: 'circle'},
            {label: 'Dot', value: 'dot'}
          ]
        },
        target: 'shape'
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
