+++json
{
  "status": "publish",
  "title": "Box",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'box',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'This is a box.'
      }
    ]
  }
%}{% endapp %}
