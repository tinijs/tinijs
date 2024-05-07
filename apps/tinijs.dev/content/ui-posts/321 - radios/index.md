+++json
{
  "status": "publish",
  "title": "Radios",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'radios',
    sections: [
      {
        section: 'input',
        attrs: {
          label: 'Name'
        },
        target: 'name',
        value: 'some-name'
      },
      {
        section: 'js',
        attrs: {
          label: 'Items'
        },
        target: 'items',
        value: [
          {label: 'Default radio'},
          {label: 'Default radio (selected)', checked: true}
        ]
      }
    ]
  }
%}{% endapp %}
