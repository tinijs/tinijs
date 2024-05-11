+++json
{
  "status": "publish",
  "title": "Box",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'box',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'This is a box.'
      },
      {
        section: 'select',
        attrs: {label: 'Scheme', preset: 'colorsAndGradients'},
        target: 'scheme'
      },
      {
        section: 'select',
        attrs: {label: 'Border radius', preset: 'borderRadiuses'},
        target: 'borderRadius'
      },
      {
        section: 'select',
        attrs: {label: 'Shadow', preset: 'boxShadows'},
        target: 'shadow'
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
