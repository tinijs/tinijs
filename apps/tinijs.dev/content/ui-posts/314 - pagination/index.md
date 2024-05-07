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
      }
    ]
  }
%}{% endapp %}
