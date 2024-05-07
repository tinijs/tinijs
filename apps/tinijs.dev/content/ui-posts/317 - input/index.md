+++json
{
  "status": "publish",
  "title": "Input",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'input',
    sections: [
      {
        section: 'input',
        attrs: {
          label: 'Label'
        },
        target: 'label',
        value: 'Email'
      },
      {
        section: 'input',
        attrs: {
          label: 'Type'
        },
        target: 'type',
        value: 'email'
      },
      {
        section: 'input',
        attrs: {
          label: 'Placeholder'
        },
        target: 'placeholder',
        value: 'name@example.com'
      }
    ]
  }
%}{% endapp %}
