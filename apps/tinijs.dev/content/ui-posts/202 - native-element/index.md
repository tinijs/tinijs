+++json
{
  "status": "publish",
  "title": "Native Elements",
  "category": "guide"
}
+++

Base styles is used to set the styles for native elements like **headings**, **text**, **link**, ... For more details, please see [Bases](/ui/base).

Below is the preview of the base styles of the current activated theme. You may want to switch to another theme of a some other family to see the differences using the **Skin Editor** panel.

## h1

<div><h1>Lorem ipsum dolor sit amet</h1></div>

## h2

<div><h2>Lorem ipsum dolor sit amet</h2></div>

## h3

<div><h3>Lorem ipsum dolor sit amet</h3></div>

## h4

<div><h4>Lorem ipsum dolor sit amet</h4></div>

## h5

<div><h5>Lorem ipsum dolor sit amet</h5></div>

## h6

<div><h6>Lorem ipsum dolor sit amet</h6></div>

## p

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel elit dapibus, finibus eros mollis, imperdiet lorem. Integer eget magna et nibh rutrum ultricies nec a neque.

## strong

**Mauris sed lorem elit.**

## em

_Nunc convallis porta tincidunt._

## u, ins

<u>Nulla faucibus posuere elit nec hendrerit.</u>

<ins>Nulla faucibus posuere elit nec hendrerit.</ins>

## s, del

<del>Nulla posuere lorem sit amet sem consequat.</del>

<s>Nulla posuere lorem sit amet sem consequat.</s>

## small

<small>Sit amet tempus leo sagittis.</small>

## mark

Donec iaculis <mark>vitae arcu</mark> fringilla hendrerit.

## hr

---

## a

[Lorem ipsum dolor sit amet.](#)

## blockquote

> "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel elit dapibus, finibus eros mollis, imperdiet lorem. Integer eget magna et nibh rutrum ultricies nec a neque."

## ul, ol, dl

- Lorem ipsum dolor sit amet
- Aliquam vel elit dapibus, finibus eros mollis
- Integer eget magna et nibh rutrum ultricies nec a neque

1. Lorem ipsum dolor sit amet
2. Aliquam vel elit dapibus, finibus eros mollis
3. Integer eget magna et nibh rutrum ultricies nec a neque

<dl>
  <dt>Lorem ipsum</dt>
  <dd>Dolor sit amet, consectetur adipiscing elit. Finibus eros mollis, imperdiet lorem.</dd>

  <dt>Aliquam</dt>
  <dd>Vel elit dapibus, finibus eros mollis.</dd>

  <dt>Integer</dt>
  <dd>Eget magna et nibh rutrum ultricies nec a neque.</dd>
</dl>

## table

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Row 1    | Row 1    | Row 1    |
| Row 2    | Row 2    | Row 2    |
| Row 3    | Row 3    | Row 3    |

## code, kbd

`const lorem = 'ipsum';`

<kbd>Ctrl + C</kbd>

## pre code

```js
const lorem = 'ipsum';

function foo() {
  return 123;
}
```

## img

![Lorem ipsum](https://placehold.co/600x400?text=Image)

## picture

<picture>
  <source srcset="https://placehold.co/800x600?text=srcset%3Ddesktop" media="(min-width: 992px)">
  <source srcset="https://placehold.co/600x400?text=srcset%3Dtablet" media="(min-width: 768px)">
  <img src="https://placehold.co/500x300?text=srcset%3Dmobile" alt="Lorem ipsum">
</picture>

## figure

<figure>
  <img src="https://placehold.co/600x400?text=Figure" alt="Lorem ipsum." />
  <figcaption>Lorem ipsum dolor sit amet</figcaption>
</figure>

## fieldset

<fieldset>
  <legend>Lorem ipsum</legend>

  <label>
    <span>Text input</span>
    <input type="text" placeholder="Text input" />
  </label>

  <label>
    <span>Email input</span>
    <input type="email" placeholder="test@example.com" />
  </label>
</fieldset>
