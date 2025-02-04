+++json
{
  "status": "publish",
  "title": "Icon",
  "category": "elements"
}
+++

## Import

<app-element-import elementName="icon"></app-element-import>

## Editor

{%
  app 'element-editor', {
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
        attrs: {label: 'Color', preset: 'schemableColors'},
        target: 'color'
      },
      {
        section: 'select',
        attrs: {label: 'Gradient', preset: 'schemableGradients'},
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
