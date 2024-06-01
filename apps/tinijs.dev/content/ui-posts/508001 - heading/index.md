+++json
{
  "status": "publish",
  "title": "Heading",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'heading',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'This is a heading.'
      },
      {
        section: 'select',
        attrs: {
          label: 'Level',
          items: [
            {label: 'Default', value: '_default', selected: true},
            {label: '2', value: '2'},
            {label: '3', value: '3'},
            {label: '4', value: '4'},
            {label: '5', value: '5'},
            {label: '6', value: '6'}
          ]
        },
        target: 'level'
      },
      {
        section: 'select',
        attrs: {label: 'Color', preset: 'colorsAndGradients'},
        target: 'color'
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
          placeholder: ':host, .main, .any { ... }'
        },
        target: 'styleDeep'
      }
    ]
  }
%}{% endapp %}
