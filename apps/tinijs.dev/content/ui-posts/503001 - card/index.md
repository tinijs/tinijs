+++json
{
  "status": "draft",
  "title": "Card",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'card',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: '<strong class="card-title">Card title</strong>\n<p>Some quick example text to build on the card title and make up the bulk of the card content.</p>\n<tini-button scheme="primary">Go somewhere</tini-button>'
      },
      {
        section: 'switch',
        attrs: {label: 'Fluid'},
        target: 'fluid'
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
