+++json
{
  "status": "draft",
  "title": "Spinner",
  "category": "components"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'spinner',
    sections: [
      {
        section: 'select',
        attrs: {label: 'Color', preset: 'colors'},
        target: 'color'
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
