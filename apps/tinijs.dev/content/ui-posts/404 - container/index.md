+++json
{
  "status": "publish",
  "title": "Container",
  "category": "layout"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'container',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'A container.'
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
