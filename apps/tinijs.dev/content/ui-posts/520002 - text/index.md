+++json
{
  "status": "publish",
  "title": "Text",
  "category": "components"
}
+++

## Import

<app-component-import componentName="text"></app-component-import>

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
        target: 'font'
      },
      {
        section: 'select',
        attrs: {label: 'Font size', preset: 'texts'},
        target: 'size'
      },
      {
        section: 'input',
        attrs: {label: 'Font weight'},
        target: 'weight'
      },
      {
        section: 'switch',
        attrs: {label: 'Italic'},
        target: 'italic'
      },
      {
        section: 'input',
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

<app-component-benchmark reportId="ui-text"></app-component-benchmark>
