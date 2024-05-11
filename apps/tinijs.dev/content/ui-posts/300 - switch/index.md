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
        attrs: {label: 'Scheme', preset: 'colorsAndGradients'},
        target: 'scheme'
      },
      {
        section: 'select',
        attrs: {label: 'Scale', preset: 'scales'},
        target: 'scale'
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
