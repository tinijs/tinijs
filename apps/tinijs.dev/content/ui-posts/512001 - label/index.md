+++json
{
  "status": "publish",
  "title": "Label",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'label',
    sections: [
      {
        section: 'input',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'Label'
      },
      {
        section: 'radios',
        attrs: {
          label: 'Shape',
          items: [
            {label: 'Default', value: '_default', checked: true},
            {label: 'Pill', value: 'pill'},
            {label: 'Circle', value: 'circle'}
          ]
        },
        target: 'shape'
      },
      {
        section: 'select',
        attrs: {label: 'Scheme', preset: 'colors'},
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
