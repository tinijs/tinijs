+++json
{
  "status": "publish",
  "title": "Label",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'label',
    sections: [
      {
        section: 'input',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'Label'
      }
    ]
  }
%}{% endapp %}
