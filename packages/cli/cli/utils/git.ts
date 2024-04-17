import {execaSync} from 'execa';

export function isGitRepo(dir = '.') {
  try {
    execaSync('git', ['rev-parse', '--is-inside-work-tree'], {cwd: dir});
    return true;
  } catch {
    return false;
  }
}

export function isGitClean(dir = '.') {
  if (!isGitRepo(dir)) return false;
  try {
    const {stdout} = execaSync('git', ['status', '--short'], {cwd: dir});
    return stdout.length <= 0;
  } catch (error) {
    return false;
  }
}
