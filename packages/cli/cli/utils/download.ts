import {resolve, parse} from 'pathe';
import axios from 'axios';
import {readdir, lstatSync, createWriteStream} from 'node:fs';
import {ensureDir, copy, remove, outputFile} from 'fs-extra/esm';
import zipper from 'adm-zip';

export async function downloadAndUnzip(url: string, filePath: string) {
  // copy
  if (!url.startsWith('http')) {
    await copy(resolve(url), filePath);
  }
  // download
  else {
    await downloadFile(url, filePath);
  }
  // unzip
  await unzip(filePath);
  // remove the zip file
  await remove(filePath);
  // unnest if wrapped
  const {dir: dirPath} = parse(filePath);
  await unnest(dirPath);
}

export function downloadFile(url: string, filePath: string): Promise<void> {
  const {dir: dirPath} = parse(filePath);
  return new Promise((resolve, reject) => {
    ensureDir(dirPath)
      .catch(reject)
      .then(() => {
        axios({
          method: 'GET',
          url,
          responseType: 'stream',
        }).then(downloadResponse => {
          downloadResponse.data.pipe(createWriteStream(filePath));
          downloadResponse.data.on('end', () => resolve());
          downloadResponse.data.on('error', reject);
        }, reject);
      }, reject);
  });
}

export async function downloadText(url: string, filePath: string) {
  const response = await axios({
    method: 'GET',
    url,
    responseType: 'text',
  });
  await outputFile(resolve(filePath), response.data);
}

export function unzip(filePath: string): Promise<void> {
  const {dir: dirPath} = parse(filePath);
  return new Promise(resolve => {
    setTimeout(() => {
      const zip = new zipper(filePath);
      zip.extractAllTo(dirPath, true);
      resolve();
    }, 1000);
  });
}

export function unnest(dir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    readdir(dir, (err, localPathChildren) => {
      const firstItem = dir + '/' + localPathChildren[0];
      if (
        localPathChildren.length === 1 &&
        lstatSync(firstItem).isDirectory()
      ) {
        // unnest
        copy(firstItem, dir)
          .catch(reject)
          // remove dir
          .then(() => remove(firstItem))
          // done
          .then(() => resolve(), reject);
      }
    });
  });
}
