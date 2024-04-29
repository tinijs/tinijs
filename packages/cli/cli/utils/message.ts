import {consola} from 'consola';
import {blueBright, green, gray, magenta} from 'colorette';
import {TINI_CONFIG_TS_FILE} from '@tinijs/project';

export function errorUncleanGit() {
  consola.error(
    `Unclean GIT working directory, please ${green('commit')} or ${green(
      'stash'
    )} changes first.`
  );
}

export function infoRunHook(sourceName: string, hookName: string) {
  consola.info(`[${magenta(sourceName)}] Run hook ${green(hookName)}`);
}

export function warnManualConfig(
  code: string,
  text?: string,
  blocks?: [string, string?]
) {
  text ||= `Unable to modify ${blueBright(
    TINI_CONFIG_TS_FILE
  )}, please add the following code:`;
  const [beginBLock = 'export default defineTiniConfig({', endBlock = '});'] =
    blocks || [];
  consola.warn(text);
  consola.box(
    `${gray(beginBLock)}
${code}
${gray(endBlock)}`
  );
}

export function warnManualConfigWithoutTiniApp(content: string, text?: string) {
  text ||=
    "It seems like you're using one or more features provided by the Tini Platform without a Tini app. If so, please config:";
  consola.warn(`${text}\n${content}`);
}

export function warnManualRegisterModule(moduleName: string) {
  warnManualConfig(`  modules: [${green(`'${moduleName}'`)}]`);
}

export function errorModuleRequireTiniApp(moduleName: string) {
  consola.error(
    `Module ${blueBright(moduleName)} requires a valid Tini app to work.`
  );
}
