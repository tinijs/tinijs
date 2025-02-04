+++json
{
  "status": "draft",
  "title": "Input",
  "category": "components"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'input',
    sections: [
      {
        section: 'input',
        attrs: {label: 'Label'},
        target: 'label',
        value: 'Email'
      },
      {
        section: 'input',
        attrs: {label: 'Type'},
        target: 'type',
        value: 'email'
      },
      {
        section: 'input',
        attrs: {label: 'Placeholder'},
        target: 'placeholder',
        value: 'name@example.com'
      },
      {
        section: 'switch',
        attrs: {label: 'Wrap'},
        target: 'wrap'
      },
      {
        section: 'switch',
        attrs: {label: 'Block'},
        target: 'block'
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
