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
        section: 'js',
        attrs: {
          label: 'Items'
        },
        target: 'items',
        value: [
          {label: 'Default checkbox'},
          {label: 'Default checkbox (checked)', checked: true}
        ]
      }
    ]
  }
%}{% endapp %}
