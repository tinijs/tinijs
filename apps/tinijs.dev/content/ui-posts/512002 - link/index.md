+++json
{
  "status": "publish",
  "title": "Link",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'link',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: 'This is a link.'
      },
      {
        section: 'input',
        attrs: {label: 'Href'},
        target: 'href',
        value: '#'
      },
      {
        section: 'select',
        attrs: {
          label: 'Target',
          items: [
            {content: 'Default', value: '_default', selected: true},
            {content: '_blank', value: '_blank'},
            {content: '_parent', value: '_parent'},
            {content: '_top', value: '_top'}
          ]
        },
        target: 'target'
      },
      {
        section: 'switch',
        attrs: {label: 'Disabled'},
        target: 'disabled'
      },
      {
        section: 'select',
        attrs: {label: 'Color', preset: 'colorsAndGradients'},
        target: 'color'
      },
      {
        section: 'select',
        attrs: {label: 'Font size', preset: 'texts'},
        target: 'size'
      },
      {
        section: 'select',
        attrs: {label: 'Font weight', preset: 'weights'},
        target: 'weight'
      },
      {
        section: 'switch',
        attrs: {label: 'Italic'},
        target: 'italic'
      },
      {
        section: 'switch',
        attrs: {label: 'No underline'},
        target: 'noUnderline'
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
