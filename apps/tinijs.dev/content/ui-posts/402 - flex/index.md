+++json
{
  "status": "publish",
  "title": "Flex",
  "category": "layout"
}
+++

## Import

<app-component-import componentName="flex"></app-component-import>

## Editor

{%
  app 'component-editor', {
    name: 'flex',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: '<div>Child 1</div><div>Child 2</div>'
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
