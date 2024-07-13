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

This benchmark is about the usability of the TiniJS framework, please use it as a suggested guide to determine if it is within the acceptable range for your project. For the raw performance, please refer the result of [lit-v3.0.0 at js-framework-benchmark](https://krausest.github.io/js-framework-benchmark/current.html), TiniJS is based on Lit, therefore the raw performance should be similar.

These below metrics are about the overhead of the corresponding frameworks, audited using Chrome Lighthouse (mode = **navigation**, device = **mobile**, category = **performance**), on a Macbook Pro M1 32GB (2021).

Setup notes:
  - Init projects using Vite TS templates or official CLIs
  - Remove all styles and unnecessary assets, add the `<h1>Hello World</h1>` template
  - Build apps using `build` command
  - Run apps using [superstatic](https://github.com/firebase/superstatic) and audit using Chrome Lighthouse

Additional notes:
  - App size is the uncompressed size of all the chunks downloaded by the browser
  - TBT is `0 ms` and CLS is `0` for all frameworks

{% css %}

  .performance-table tr td {
    font-size: 1.25rem;
  }

  .performance-table tr th:first-child {
    width: 50%;
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
      <th>Baseline</th>
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
  </tbody>

</table>

<table class="performance-table">

  <thead>
    <tr>
      <th>Meta frameworks</th>
      <th>App size</th>
      <th>Score</th>
      <th>FCP</th>
      <th>LCP</th>
    </tr>
  </thead>

  <tbody>

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

  </tbody>

</table>

<table class="performance-table">

  <thead>
    <tr>
      <th>Base frameworks</th>
      <th>App size</th>
      <th>Score</th>
      <th>FCP</th>
      <th>LCP</th>
    </tr>
  </thead>

  <tbody>

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

Here is a list of major limitations worth mentioning, I will try to address them in the future versions hopefully.

### Server-side rendering

SSR will not be available in the first version, I know it is a bummer but I don't have much time and effort for it just yet. I do really hope it will be able to support full SSR in the future, apology for the inconvenience. 🙏

But, is it usable without SSR? Well, it depends on the kind of apps and other factors. SSR has advantages and disavantages that we should consider before deciding to include in our apps or not.

In my opinion, there are 2 kinds of apps:
- _For human only_: if you are building **landing pages** or **mobile apps** or **desktop apps** or even **PWA apps** and **non-public facing web apps**, then SSR is unnecessary.
- _For human and bot_: the rest belongs to the group of **public facing multi-routes web apps**, where pages are accessed by URLs, in this case, SSR provides certain benefits.

The main benefits of SSR compared to SPA:

| Pros                             | SSR                                                                                              | TiniJS (SPA)                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| **SEO and Social media sharing** | Search engines and social media crawlers can crawl and index server-side rendered pages natively | Google crawlers are able to index SPA applications but it is not as good as SSR                 |
| **Loading performance**          | The initial page load is expected to be faster and the whole page appears at once                | TiniJS apps is small and fast, loading indicators are not very bad as long as it is fast enough |

Beside the benefits, SSR has some drawbacks:

| Cons                             | SSR                                                                                                                                                                                | TiniJS (SPA)                                                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Interactives**                 | Not very good for highly interactive apps                                                                                                                                          | Provide app-like experience with smooth interactions                                                                      |
| **Cost and complexity**          | It requires more effort and cost for infrastructure, it is mandatory for enterprise apps, but for small and medium projects, it is a burden                                        | Requires much less server capability to serve SPA apps, therefore reducing cost and maintaining effort                    |
| **Incompatable and inefficient** | Fragmentation of features between server and client, incompatible with some libraries and tools. Double the energy for rendering content on the server and hydrating on the client | SPA apps care only about the client side, utilizing the free power of end user devices to render content and interactions |
