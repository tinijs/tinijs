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
            {label: 'Default', value: '_default', selected: true},
            {label: '_blank', value: '_blank'}
          ]
        },
        target: 'target'
      },
      {
        section: 'select',
        attrs: {label: 'Color', preset: 'colorsAndGradients'},
        target: 'color'
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
