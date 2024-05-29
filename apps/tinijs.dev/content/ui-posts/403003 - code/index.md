+++json
{
  "status": "publish",
  "title": "Code",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'code',
    sections: [
      {
        section: 'input',
        attrs: {label: 'Language'},
        target: 'language',
        value: 'javascript'
      },
      {
        section: 'html',
        attrs: {label: 'Content'},
        target: 'content',
        value: 'const foo = 123;'
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
