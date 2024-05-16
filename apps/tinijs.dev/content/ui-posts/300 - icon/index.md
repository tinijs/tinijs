+++json
{
  "status": "publish",
  "title": "Icon",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'icon',
    sections: [
      {
        section: 'html',
        attrs: {label: 'URL/URI'},
        target: 'src',
        value: 'https://icons.getbootstrap.com/assets/icons/heart-fill.svg'
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
