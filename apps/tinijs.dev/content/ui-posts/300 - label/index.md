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
            {label: 'Normal', value: 'normal'},
            {label: 'Pill', value: 'pill'}
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
