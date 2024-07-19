+++json
{
  "status": "draft",
  "title": "Textarea",
  "category": "components"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'textarea',
    sections: [
      {
        section: 'input',
        attrs: {label: 'Label'},
        target: 'label',
        value: 'Content'
      },
      {
        section: 'input',
        attrs: {label: 'Placeholder'},
        target: 'placeholder',
        value: 'Lorem ipsum ...'
      },
      {
        section: 'switch',
        attrs: {label: 'Disabled'},
        target: 'disabled'
      },
      {
        section: 'select',
        attrs: {label: 'Color', preset: 'colors'},
        target: 'color'
      },
      {
        section: 'select',
        attrs: {label: 'Size', preset: 'sizes'},
        target: 'size'
      },
      {
        section: 'css',
        attrs: {
          label: 'Style deep',
          placeholder: ':host, .main, .any { ... }'
        },
        target: 'styleDeep'
      }
    ]
  }
%}{% endapp %}
