+++json
{
  "status": "publish",
  "title": "Icon",
  "category": "components"
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
        attrs: {label: 'Color', preset: 'allColors'},
        target: 'color'
      },
      {
        section: 'select',
        attrs: {label: 'Gradient', preset: 'allGradients'},
        target: 'gradient'
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
