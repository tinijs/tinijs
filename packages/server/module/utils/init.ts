import {execa} from 'execa';
import {green, blueBright} from 'colorette';
import {TINI_CONFIG_TS_FILE} from '@tinijs/project';
import {warnManualConfig, warnManualConfigWithoutTiniApp} from '@tinijs/cli';

export async function prepareNitro() {
  return execa('nitro', ['prepare', '--dir', 'server']);
}

export function showConfigInstruction() {
  warnManualConfig(
    `  outDir: ${green("'./server/public'")}`,
    `Please set the client app output in ${blueBright(TINI_CONFIG_TS_FILE)}:`
  );
}

export function showConfigInstructionWithoutTiniApp() {
  warnManualConfigWithoutTiniApp(
    `  + Set the client app output to ${green('server/public')}`
  );
}
