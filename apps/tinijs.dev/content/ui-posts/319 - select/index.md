+++json
{
  "status": "publish",
  "title": "Select",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'select',
    sections: [
      {
        section: 'input',
        attrs: {
          label: 'Label'
        },
        target: 'label',
        value: 'Select an option'
      },
      {
        section: 'js',
        attrs: {
          label: 'Options/Optgroups'
        },
        target: 'items',
        value: [
          {label: 'Option 1', value: '1'},
          {label: 'Option 2', value: '2'},
          {label: 'Option 3', value: '3'}
        ]
      }
    ]
  }
%}{% endapp %}
