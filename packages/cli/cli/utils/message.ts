import {consola} from 'consola';
import {green} from 'colorette';

export function errorUncleanGit() {
  consola.error(
    `Unclean GIT working directory, please ${green('commit')} or ${green(
      'stash'
    )} changes first.`
  );
}
