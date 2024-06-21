+++json
{
  "status": "draft",
  "title": "Benchmark and Limits",
  "category": "uncategorized"
}
+++

<style>
  {% getBundle "css" %}
</style>

This article provides an insight into the performance aspect and the limitations of the TiniJS framework. The information may provide a better understanding of the framework and help you decide whether it is suitable for your project. But in general, I recommend you to try it out and see for yourself with real world scenarios.

## Benchmark

When it comes to performance, TiniJS prioritizes the usability over raw performance. Therefore, please use the following **Lighthouse scores** as a suggested guide to determine if it is within the acceptable range for your project.

These below metrics are about the overhead (using a simple Hello World page) of the corresponding frameworks, audited using Chrome Lighthouse (mode = navigation, device = mobile, category = performance), on a Macbook Pro M1 32GB.

TBT is `0 ms` and CLS is `0` for all frameworks, Speed Index is equal to FCP, therefor the columns are excluded from the table.

{% css %}

  .performance-table tr td {
    font-size: 1.25rem;
  }

  .performance-table tr th:first-child {
    max-width: 50%;
  }

  .performance-table tr td:first-child {
    font-size: 1rem;
  }

  .performance-table em {
    color: var(--color-medium);
  }

  .performance-table .ok {
    color: var(--color-success);
  }

  .performance-table .md {
    color: var(--color-warning);
  }

  .performance-table .ng {
    color: var(--color-danger);
  }

{% endcss %}

<table class="performance-table">

  <thead>
    <tr>
      <th>Framework</th>
      <th>Size</th>
      <th>Score</th>
      <th>FCP</th>
      <th>LCP</th>
    </tr>
  </thead>

  <tbody>

    <tr>
      <td>Vanilla</td>
      <td>1.8 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">0.8 s</span></td>
      <td><span class="ok">0.8 s</span></td>
    </tr>

    <tr>
      <td>Lit 3.1.2</td>
      <td>18.3 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">0.9 s</span></td>
      <td><span class="ok">0.9 s</span></td>
    </tr>

    <tr>
      <td>Tini 0.20.0 <br> <em>(App only)</em></td>
      <td>37.4 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">0.9 s</span></td>
      <td><span class="ok">0.9 s</span></td>
    </tr>

    <tr>
      <td>Tini 0.20.0 <br> <em>(includes App, Router, Meta and UI)</em></td>
      <td>74.2 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">1.3 s</span></td>
      <td><span class="ok">1.7 s</span></td>
    </tr>

    <tr>
      <td>Vue 3.4.21</td>
      <td>54.4 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">1.1 s</span></td>
      <td><span class="ok">1.1 s</span></td>
    </tr>

    <tr>
      <td>React 18.2.0</td>
      <td>143.7 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">1.5 s</span></td>
      <td><span class="ok">1.5 s</span></td>
    </tr>

    <tr>
      <td>Angular 18.0.0</td>
      <td>212.3 kB</td>
      <td><span class="ok">98</span></td>
      <td><span class="md">2.0 s</span></td>
      <td><span class="ok">2.0 s</span></td>
    </tr>

    <tr>
      <td>Svelte 4.2.12</td>
      <td>4.7 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">0.8 s</span></td>
      <td><span class="ok">0.8 s</span></td>
    </tr>

    <tr>
      <td>Solid 1.8.15</td>
      <td>7.6 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">0.8 s</span></td>
      <td><span class="ok">0.8 s</span></td>
    </tr>

  </tbody>

</table>

## Limits

Here is a list of major limitations worth mentioning. I will try to address them in the future versions hopefully.

### Server-side rendering

SSR will not be available in the first version, I know it is a big bummer but I don't have much time and effort for it now. I hope I will be able to support fully SSR in the future.
