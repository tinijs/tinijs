+++json
{
  "status": "publish",
  "title": "Text",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'text',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'This is a text.'
      },
      {
        section: 'select',
        attrs: {
          label: 'Tag',
          items: [
            {label: 'Default', value: '_default', selected: true},
            {label: 'P', value: 'p'},
            {label: 'Strong', value: 'strong'},
            {label: 'Em', value: 'em'},
            {label: 'Span', value: 'span'}
          ]
        },
        target: 'tag'
      }
    ]
  }
%}{% endapp %}
