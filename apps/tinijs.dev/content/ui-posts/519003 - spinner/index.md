+++json
{
  "status": "publish",
  "title": "Spinner",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'spinner',
    sections: [
      {
        section: 'select',
        attrs: {label: 'Scheme', preset: 'colors'},
        target: 'scheme'
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
          placeholder: ':host, .root, .any { ... }'
        },
        target: 'styleDeep'
      }
    ]
  }
%}{% endapp %}
