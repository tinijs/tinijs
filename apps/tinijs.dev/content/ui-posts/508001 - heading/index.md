+++json
{
  "status": "publish",
  "title": "Heading",
  "category": "component"
}
+++

## Import

<app-component-import componentName="heading"></app-component-import>

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
            {content: 'Default', value: '_default'},
            {content: '2', value: '2'},
            {content: '3', value: '3'},
            {content: '4', value: '4'},
            {content: '5', value: '5'},
            {content: '6', value: '6'}
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

## Benchmark

<app-component-benchmark reportId="ui-heading"></app-component-benchmark>
