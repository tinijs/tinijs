+++json
{
  "status": "publish",
  "title": "Checkboxes",
  "category": "component"
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
