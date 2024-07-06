+++json
{
  "status": "publish",
  "title": "Icon",
  "category": "component"
}
+++

## Import

<app-component-import componentName="icon"></app-component-import>

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
