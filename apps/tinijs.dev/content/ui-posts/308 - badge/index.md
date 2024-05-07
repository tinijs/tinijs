+++json
{
  "status": "publish",
  "title": "Badge",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'badge',
    sections: [
      {
        section: 'input',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: '999+'
      }
    ]
  }
%}{% endapp %}
