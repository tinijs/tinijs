+++json
{
  "status": "publish",
  "title": "Breadcrumb",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'breadcrumb',
    sections: [
      {
        section: 'js',
        attrs: {
          label: 'Items'
        },
        target: 'items',
        value: [
          {label: 'Home', href: '#'},
          {label: 'Library', href: '#'},
          {label: 'Data'}
        ]
      }
    ]
  }
%}{% endapp %}
