+++json
{
  "status": "publish",
  "title": "Button",
  "category": "component"
}
+++

Use buttons to trigger actions.

## Editor

{%
  app 'component-editor', {
    name: 'button',
    sections: [
      {
        section: 'select',
        attrs: {
          label: 'Scheme',
          preset: 'colorsAndGradients'
        },
        target: 'scheme'
      },
      {
        section: 'select',
        attrs: {
          label: 'Scale',
          preset: 'scales'
        },
        target: 'scale'
      },
      {
        section: 'textarea',
        attrs: {
          label: 'Inner'
        },
        target: 'inner',
        value: 'Button'
      }
    ]
  }
%}{% endapp %}

## API

Lorem ipsum ...
