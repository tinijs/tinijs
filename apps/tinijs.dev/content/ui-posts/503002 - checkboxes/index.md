+++json
{
  "status": "draft",
  "title": "Checkboxes",
  "category": "components"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'checkboxes',
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
          {label: 'Item 2 (checked)', checked: true},
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
        attrs: {label: 'Scheme', preset: 'colors'},
        target: 'scheme'
      },
      {
        section: 'select',
        attrs: {label: 'Scheme (focus + checked)', preset: 'colors'},
        target: 'checkedScheme'
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
