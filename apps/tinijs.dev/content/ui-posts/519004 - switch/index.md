+++json
{
  "status": "draft",
  "title": "Switch",
  "category": "components"
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
        value: 'A switch'
      },
      {
        section: 'input',
        attrs: {label: 'Name'},
        target: 'name',
        value: 'some-name'
      },
      {
        section: 'switch',
        attrs: {label: 'Checked'},
        target: 'checked'
      },
      {
        section: 'switch',
        attrs: {label: 'Disabled'},
        target: 'disabled'
      },
      {
        section: 'select',
        attrs: {label: 'Scheme', preset: 'allColorsAndAllGradients'},
        target: 'scheme'
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
