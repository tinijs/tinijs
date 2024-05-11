+++json
{
  "status": "publish",
  "title": "Figure",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'figure',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: '<tini-image fluid src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=250&q=80"></tini-image>\n<span slot="caption-bottom">An caption for the above image.</span>'
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
