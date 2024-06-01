+++json
{
  "status": "publish",
  "title": "Select",
  "category": "component"
}
+++

## Editor

{%
  app 'component-editor', {
    name: 'select',
    sections: [
      {
        section: 'input',
        attrs: {label: 'Label'},
        target: 'label',
        value: 'Select an option'
      },
      {
        section: 'input',
        attrs: {label: 'Name'},
        target: 'name',
        value: 'some-name'
      },
      {
        section: 'js',
        attrs: {label: 'Options/Optgroups'},
        target: 'items',
        value: [
          {label: 'Option 1', value: '1'},
          {label: 'Option 2 (disabled)', value: '2', disabled: true},
          {label: 'Option 3', value: '3'},
          {
            label: 'Group A',
            children: [
              {label: 'Option A1', value: 'a1'},
              {label: 'Option A2', value: 'a2'}
            ]
          },
          {
            label: 'Group B',
            children: [
              {label: 'Option B1', value: 'b1'},
              {label: 'Option B2', value: 'b2'}
            ]
          }
        ]
      },
      {
        section: 'switch',
        attrs: {label: 'Wrap'},
        target: 'wrap'
      },
      {
        section: 'switch',
        attrs: {label: 'Block'},
        target: 'block'
      },
      {
        section: 'switch',
        attrs: {label: 'Disabled'},
        target: 'disabled'
      },
      {
        section: 'select',
        attrs: {label: 'Scheme', preset: 'colors'},
        target: 'scheme'
      },
      {
        section: 'select',
        attrs: {label: 'Scheme (focus)', preset: 'colors'},
        target: 'focusScheme'
      },
      {
        section: 'select',
        attrs: {label: 'Size', preset: 'sizes'},
        target: 'size'
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
