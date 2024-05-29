+++json
{
  "status": "publish",
  "title": "Table",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'table',
    sections: [
      {
        section: 'js',
        attrs: {label: 'Head'},
        target: 'head',
        value: ['#', 'Name', 'Age']
      },
      {
        section: 'js',
        attrs: {label: 'Body'},
        target: 'body',
        value: [
          [1, 'Alex', 25],
          [2, 'Bob', 22],
          [3, 'Chris', 30]
        ]
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
