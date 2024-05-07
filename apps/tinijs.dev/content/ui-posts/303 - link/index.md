+++json
{
  "status": "publish",
  "title": "Link",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'link',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'This is a link.'
      }
    ]
  }
%}{% endapp %}
