import {resolve, parse} from 'node:path';
import {fileURLToPath} from 'node:url';
import {readFile} from 'node:fs/promises';

export type AppOptions = {};

export function createServerApp(entryURL: string, options?: AppOptions) {
  return new ServerApp(entryURL, options);
}

export class ServerApp {
  private entryPath = fileURLToPath(this.entryURL);
  private isDevelopment = this.entryPath.includes('/.nitro/dev/');
  private originalIndexHTML?: string;

  constructor(
    private entryURL: string,
    public readonly options: AppOptions = {}
  ) {}

  private async readIndexHtml() {
    const read = async () =>
      readFile(resolve(parse(this.entryPath).dir, 'index.html'), 'utf8');
    return this.isDevelopment
      ? await read()
      : (this.originalIndexHTML ||= await read());
  }

  async serve() {
    return this.readIndexHtml();
  }
}
