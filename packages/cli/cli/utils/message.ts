import {consola} from 'consola';

export function logMissingArg(name: string) {
  consola.log(`error: missing required argument '${name}'`, true);
}

export function errorInvalidSubCommand(
  subCommand: string,
  availableSubCommands: Record<string, string>
) {
  consola.error(
    `Invalid sub-command '${subCommand}', available: ${Object.values(
      availableSubCommands
    ).join(', ')}.`
  );
}

export function errorUncleanGit() {
  consola.error(
    'Unclean git working directory. Please commit or stash changes first.'
  );
}
