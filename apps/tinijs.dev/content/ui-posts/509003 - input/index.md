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
        attrs: {label: 'Scheme', preset: 'colors'},
        target: 'scheme'
      },
      {
        section: 'select',
        attrs: {label: 'Scheme (focus)', preset: 'colors'},
        target: 'focusScheme'
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
          placeholder: ':host, .root, .any { ... }'
        },
        target: 'styleDeep'
      }
    ]
  }
%}{% endapp %}
