+++json
{
  "status": "publish",
  "title": "This is a sample post",
  "excerpt": "This is a post on My Blog about win-win survival strategies.",
  "created": "2024-01-01",
  "updated": "2024-01-01",
  "thumbnail": "{% imageUrl './thumbnail.webp', 480 %}",
  "image": "{% imageUrl './image.webp', 1920 %}",
  "authors": ["John Doe"],
  "categories": ["Tech"],
  "tags": ["Win-Win", "Survival", "Strategies"]
}
+++

{% set scopedUploads = "/tini-content/posts/a-sample-post/uploads" %}

<style>
  {% getBundle "css" %}
</style>

Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.

{% image './images/image-1.jpg', 'Image 1' %}

Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.

{% image './images/image-2.png', 'Image 2' %}

## Code

{% css %}
  .custom-style-1 {
    font-style: italic;
  }
{% endcss %}

### Styled (with Syntax)

Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.

```js
// this is a command
function myCommand() {
	let counter = 0;
	counter++;
}

// Test with a line break above this line.
console.log('Test');
```

### Unstyled

Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.

```
// this is a command
function myCommand() {
	let counter = 0;
	counter++;
}

// Test with a line break above this line.
console.log('Test');
```

## Section Header

{% css %}
  .custom-style-2 {
    font-weight: bold;
  }
{% endcss %}

Download a uploaded file: <a href="{{scopedUploads}}/file.txt" target="_blank">file.txt</a>

Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.
