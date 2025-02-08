+++json
{
  "status": "draft",
  "title": "Breadcrumbs",
  "category": "elements"
}
+++

## Editor

{%
  app 'element-editor', {
    name: 'breadcrumbs',
    sections: [
      {
        section: 'js',
        attrs: {
          label: 'Items'
        },
        target: 'items',
        value: [
          {content: 'Home', href: '#'},
          {content: 'Library', href: '#'},
          {content: 'Data', href: '#'}
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
