+++json
{
  "status": "publish",
  "title": "Textarea",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'textarea',
    sections: [
      {
        section: 'input',
        attrs: {
          label: 'Label'
        },
        target: 'label',
        value: 'Content'
      },
      {
        section: 'input',
        attrs: {
          label: 'Placeholder'
        },
        target: 'placeholder',
        value: 'Lorem ipsum ...'
      }
    ]
  }
%}{% endapp %}
