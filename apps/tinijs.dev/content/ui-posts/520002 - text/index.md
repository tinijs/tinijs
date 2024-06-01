+++json
{
  "status": "publish",
  "title": "Text",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'text',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'This is a text.'
      },
      {
        section: 'switch',
        attrs: {label: 'Block'},
        target: 'block'
      },
      {
        section: 'select',
        attrs: {label: 'Color', preset: 'colorsAndGradients'},
        target: 'color'
      },
      {
        section: 'select',
        attrs: {label: 'Font type', preset: 'fonts'},
        target: 'fontType'
      },
      {
        section: 'select',
        attrs: {label: 'Font size', preset: 'texts'},
        target: 'fontSize'
      },
      {
        section: 'select',
        attrs: {label: 'Font weight', preset: 'weights'},
        target: 'fontWeight'
      },
      {
        section: 'switch',
        attrs: {label: 'Italic'},
        target: 'italic'
      },
      {
        section: 'switch',
        attrs: {label: 'Underline'},
        target: 'underline'
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
