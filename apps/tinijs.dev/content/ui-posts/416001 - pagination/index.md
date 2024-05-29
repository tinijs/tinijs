+++json
{
  "status": "publish",
  "title": "Pagination",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'pagination',
    sections: [
      {
        section: 'input',
        attrs: {
          label: 'Total page'
        },
        target: 'totalPage',
        value: 3
      },
      {
        section: 'select',
        attrs: {label: 'Scheme', preset: 'allColorsAndAllGradients'},
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
