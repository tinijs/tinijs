+++json
{
  "status": "draft",
  "title": "Message",
  "category": "components"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'message',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'This is a message.'
      },
      {
        section: 'select',
        attrs: {label: 'Color', preset: 'colors'},
        target: 'color'
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
