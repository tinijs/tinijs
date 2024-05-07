+++json
{
  "status": "publish",
  "title": "Message",
  "category": "component"
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
      }
    ]
  }
%}{% endapp %}
