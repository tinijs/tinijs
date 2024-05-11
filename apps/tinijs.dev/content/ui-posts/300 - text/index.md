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
        section: 'select',
        attrs: {
          label: 'Tag',
          items: [
            {label: 'Default', value: '_default', selected: true},
            {label: 'P', value: 'p'},
            {label: 'Strong', value: 'strong'},
            {label: 'Em', value: 'em'},
            {label: 'Span', value: 'span'}
          ]
        },
        target: 'tag'
      },
      {
        section: 'select',
        attrs: {label: 'Color', preset: 'colorsAndGradients'},
        target: 'color'
      },
      {
        section: 'select',
        attrs: {label: 'Font type', preset: 'fontTypes'},
        target: 'fontType'
      },
      {
        section: 'select',
        attrs: {label: 'Font size', preset: 'factors'},
        target: 'fontSize'
      },
      {
        section: 'select',
        attrs: {label: 'Font weight', preset: 'fontWeights'},
        target: 'fontWeight'
      },
      {
        section: 'select',
        attrs: {label: 'Text transform', preset: 'textTransforms'},
        target: 'textTransform'
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
