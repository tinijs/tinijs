+++json
{
  "status": "publish",
  "title": "Switch",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'switch',
    sections: [
      {
        section: 'input',
        attrs: {
          label: 'Label'
        },
        target: 'label',
        value: 'Default switch checkbox input'
      }
    ]
  }
%}{% endapp %}
