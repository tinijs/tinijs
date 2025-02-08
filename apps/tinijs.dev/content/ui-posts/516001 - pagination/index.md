+++json
{
  "status": "draft",
  "title": "Pagination",
  "category": "elements"
}
+++

## Editor

{%
  app 'element-editor', {
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
        attrs: {label: 'Color', preset: 'schemableColors'},
        target: 'color'
      },
      {
        section: 'select',
        attrs: {label: 'Gradient', preset: 'schemableGradients'},
        target: 'gradient'
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
