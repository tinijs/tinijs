+++json
{
  "status": "publish",
  "title": "Image",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'image',
    sections: [
      {
        section: 'html',
        attrs: {label: 'SRC'},
        target: 'src',
        value: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=250&q=80'
      },
      {
        section: 'switch',
        attrs: {label: 'Fluid'},
        target: 'fluid',
        value: true
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
