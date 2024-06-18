import mri from 'mri';
import ora from 'ora';
import {green} from 'colorette';
import {resolve} from 'pathe';
import {outputJSON} from 'fs-extra/esm';
import lighthouse, {type Flags} from 'lighthouse';
import {launch} from 'chrome-launcher';
import Table from 'tty-table';

import SUBJECTS from '../apps/benchmark.tinijs.dev/app/subjects.js';

interface Args {
  path?: string;
}

const APP_URL = 'http://localhost:3000';
const OUT_DIR = './apps/tinijs.dev/app/public/benchmark-reports';

class Benchmark {
  constructor(private args: mri.Argv<Args>) {}

  async run() {
    const SPINNER = ora();

    // included paths
    const includedPaths = this.args.path?.split(',') || [];

    // launch chrome
    SPINNER.start('Launching Chrome');
    const chrome = await launch({chromeFlags: ['--headless']});

    // run lighthouse
    const options: Flags = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['performance'],
      port: chrome.port,
    };
    const tableBody = [];
    for (const {path, batches} of SUBJECTS) {
      if (this.args.path && !includedPaths.includes(path)) continue;
      const results: Record<string, any> = {};
      for (const items of batches) {
        SPINNER.start(`Benchmarking ${green(path)} with ${green(items.toLocaleString())} items`);
        const runnerResult = await lighthouse(`${APP_URL}${path}?items=${items}`, options);
        const jsonResult = JSON.parse(runnerResult?.report as string);
        const score = jsonResult.categories.performance.score;
        const fcp = jsonResult.audits['first-contentful-paint'].displayValue;
        const lcp = jsonResult.audits['largest-contentful-paint'].displayValue;
        const tbt = jsonResult.audits['total-blocking-time'].displayValue;
        const cls = jsonResult.audits['cumulative-layout-shift'].displayValue;
        const si = jsonResult.audits['speed-index'].displayValue;
        results[`${items}`] = {score, fcp, lcp, tbt, cls, si};
        tableBody.push([path, items, score * 100, fcp, lcp, tbt, cls, si]);
      }
      await outputJSON(
        resolve(OUT_DIR, `${path.slice(1).replace(/\//g, '-')}.json`),
        results,
      );
    }

    // done
    chrome.kill();
    SPINNER.succeed('Benchmark done!');
    console.log(
      Table(
        [
          {value: 'Path'},
          {value: 'Items'},
          {value: 'Score'},
          {value: 'FCP'},
          {value: 'LCP'},
          {value: 'TBT'},
          {value: 'CLS'},
          {value: 'SI'},
        ],
        tableBody,
      ).render()
    );
    console.log('');
  }
}

new Benchmark(mri(process.argv.slice(2))).run();
