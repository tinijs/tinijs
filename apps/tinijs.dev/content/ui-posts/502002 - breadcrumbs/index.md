+++json
{
  "status": "publish",
  "title": "Breadcrumbs",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'breadcrumbs',
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
