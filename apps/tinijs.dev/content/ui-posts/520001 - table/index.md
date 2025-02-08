+++json
{
  "status": "publish",
  "title": "Table",
  "category": "elements"
}
+++

## Import

<app-element-import elementName="table"></app-element-import>

## Editor

{%
  app 'element-editor', {
    name: 'table',
    sections: [
      {
        section: 'js',
        attrs: {label: 'Items'},
        target: 'items',
        value: [
          ['#', 'Name', 'Age'],
          [1, 'Alex', 25],
          [2, 'Bob', 22],
          [3, 'Chris', 30]
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
