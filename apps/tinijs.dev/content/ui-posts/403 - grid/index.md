+++json
{
  "status": "publish",
  "title": "Grid",
  "category": "layout"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'grid',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'Grid layout.'
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
