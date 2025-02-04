+++json
{
  "status": "draft",
  "title": "Radios",
  "category": "components"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'radios',
    sections: [
      {
        section: 'input',
        attrs: {label: 'Name'},
        target: 'name',
        value: 'some-name'
      },
      {
        section: 'js',
        attrs: {label: 'Items'},
        target: 'items',
        value: [
          {label: 'Item 1'},
          {label: 'Item 2 (selected)', checked: true},
          {label: 'Item 3 (disabled)', disabled: true}
        ]
      },
      {
        section: 'switch',
        attrs: {label: 'Wrap'},
        target: 'wrap'
      },
      {
        section: 'select',
        attrs: {label: 'Color', preset: 'colors'},
        target: 'color'
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
