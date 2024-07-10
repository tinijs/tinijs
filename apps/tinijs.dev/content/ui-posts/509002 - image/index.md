+++json
{
  "status": "publish",
  "title": "Image",
  "category": "components"
}
+++

## Import

<app-component-import componentName="image"></app-component-import>

## Editor

{%
  app 'component-editor', {
    name: 'image',
    sections: [
      {
        section: 'html',
        attrs: {label: 'SRC'},
        target: 'src',
        value: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=350&q=80'
      },
      {
        section: 'input',
        attrs: {label: 'Width', placeholder: '50px, 10rem, 50%'},
        target: 'width'
      },
      {
        section: 'input',
        attrs: {label: 'Height', placeholder: '50px, 10rem, 50%'},
        target: 'height'
      },
      {
        section: 'select',
        attrs: {label: 'Radius', preset: 'radiuses'},
        target: 'radius'
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

<app-component-benchmark reportId="ui-image"></app-component-benchmark>
