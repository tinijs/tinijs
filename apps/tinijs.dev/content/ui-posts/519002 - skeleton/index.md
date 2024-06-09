+++json
{
  "status": "publish",
  "title": "Skeleton",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'skeleton',
    sections: [
      {
        section: 'input',
        attrs: {
          label: 'Width',
          placeholder: '100px, 50%, etc.'
        },
        target: 'width'
      },
      {
        section: 'input',
        attrs: {
          label: 'Height',
          placeholder: '100px, 10rem, etc.'
        },
        target: 'height'
      },
      {
        section: 'input',
        attrs: {
          label: 'Speed',
          placeholder: '1.5s, 2000ms, etc.'
        },
        target: 'speed'
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
