+++json
{
  "status": "publish",
  "title": "Benchmark and Limits",
  "category": "uncategorized"
}
+++

<style>
  {% getBundle "css" %}
</style>

This article provides an insight into the performance aspect and the limitations of the TiniJS framework. The information may provide a better understanding of the framework and help you decide whether it is suitable for your project. But in general, I recommend you to try it out and see for yourself with real world scenarios.

## Overhead benchmark

When it comes to performance, TiniJS prioritizes the usability over raw performance. Therefore, please use the following **Lighthouse scores** as a suggested guide to determine if it is within the acceptable range for your project.

These below metrics are about the overhead (using a simple **Hello World** page) of the corresponding frameworks, audited using Chrome Lighthouse (mode = **navigation**, device = **mobile**, category = **performance**), on a Macbook Pro M1 32GB (2021).

Notes:
  - App size is the uncompressed size of all the chunks downloaded by the browser
  - TBT is `0 ms` and CLS is `0` for all frameworks

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
      <th>App size</th>
      <th>Score</th>
      <th>FCP</th>
      <th>LCP</th>
    </tr>
  </thead>

  <tbody>

    <tr>
      <td>
        <strong>Vanilla</strong> <br>
        <em>(Vite <a target="_blank" href="https://vitejs.dev/guide/">vanilla-ts</a>)</em>
      </td>
      <td>2 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">0.8 s</span></td>
      <td><span class="ok">0.8 s</span></td>
    </tr>

    <tr>
      <td>
        <strong>Lit</strong> 3.1.2 <br>
        <em>(Vite <a target="_blank" href="https://vitejs.dev/guide/">lit-ts</a>)</em>
      </td>
      <td>18 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">0.9 s</span></td>
      <td><span class="ok">0.9 s</span></td>
    </tr>

    <tr>
      <td>
        <strong>Tini</strong> 0.20.0 <br>
        <em>(App only - <a target="_blank" href="https://github.com/tinijs/bare-starter">Bare</a> starter)</em>
      </td>
      <td>37 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">0.9 s</span></td>
      <td><span class="ok">0.9 s</span></td>
    </tr>

    <tr>
      <td>
        <strong>Tini</strong> 0.20.0 <br>
        <em>(App, Router, Meta and UI - <a target="_blank" href="https://github.com/tinijs/blank-starter">Blank</a> starter)</em>
      </td>
      <td>74 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">1.2 s</span></td>
      <td><span class="ok">1.7 s</span></td>
    </tr>

    <tr>
      <td>
        <strong>Vue</strong> 3.4.21 <br>
        <em>(Vite <a target="_blank" href="https://vitejs.dev/guide/">vue-ts</a>)</em>
      </td>
      <td>54 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">1.1 s</span></td>
      <td><span class="ok">1.1 s</span></td>
    </tr>

    <tr>
      <td>
        <strong>React</strong> 18.2.0 <br>
        <em>(Vite <a target="_blank" href="https://vitejs.dev/guide/">react-ts</a>)</em>
      </td>
      <td>144 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">1.5 s</span></td>
      <td><span class="ok">1.5 s</span></td>
    </tr>

    <tr>
      <td>
        <strong>Angular</strong> 18.0.0 <br>
        <em>(Angular <a target="_blank" href="https://angular.dev/tools/cli/setup-local">ng new</a>)</em>
      </td>
      <td>212 kB</td>
      <td><span class="ok">98</span></td>
      <td><span class="md">2.0 s</span></td>
      <td><span class="ok">2.0 s</span></td>
    </tr>

    <tr>
      <td>
        <strong>Svelte</strong> 4.2.12 <br>
        <em>(Vite <a target="_blank" href="https://vitejs.dev/guide/">svelte-ts</a>)</em>
      </td>
      <td>5 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">0.8 s</span></td>
      <td><span class="ok">0.8 s</span></td>
    </tr>

    <tr>
      <td>
        <strong>Solid</strong> 1.8.15 <br>
        <em>(Vite <a target="_blank" href="https://vitejs.dev/guide/">solid-ts</a>)</em>
      </td>
      <td>8 kB</td>
      <td><span class="ok">100</span></td>
      <td><span class="ok">0.8 s</span></td>
      <td><span class="ok">0.8 s</span></td>
    </tr>

  </tbody>

</table>

## Limitations

Here is a list of major limitations worth mentioning. I will try to address them in the future versions hopefully.

### Server-side rendering

SSR will not be available in the first version, I know it is a big bummer but I don't have much time and effort for it now. I hope I will be able to support fully SSR in the future. Apology for the inconvenience. 🙏
