+++json
{
  "status": "publish",
  "title": "Embed",
  "category": "components"
}
+++

## Import

<app-component-import componentName="embed"></app-component-import>

## Editor

{%
  app 'component-editor', {
    name: 'embed',
    sections: [
      {
        section: 'html',
        attrs: {label: 'Inner'},
        target: 'inner',
        value: '<iframe width="560" height="315" src="https://www.youtube.com/embed/aqz-KE-bpKQ?si=pMUWQVk63DgVToPe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
      },
      {
        section: 'select',
        attrs: {
          label: 'Ratio',
          items: [
            {content: 'Default (16/9)', value: '_default'},
            {content: '4/3', value: '4/3'},
            {content: '1/1', value: '1/1'},
            {content: '9/16', value: '9/16'}
          ]
        },
        target: 'ratio'
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
