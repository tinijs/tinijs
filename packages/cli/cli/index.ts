#!/usr/bin/env node
import {defineCommand, runMain, type SubCommandsDef} from 'citty';

import {TiniProject, getTiniProject} from '@tinijs/project';

import {loadCLIPackageJSON} from './utils/project.js';
import {resolveCommand, setupCLIExpansion} from './utils/cli.js';

async function getCommands(tiniProject: TiniProject) {
  const cliConfig = tiniProject.config.cli;
  const {noBuiltins} = cliConfig || {};
  const commands: SubCommandsDef = {};
  // built-in commands
  if (!noBuiltins && cliConfig?.docs !== false)
    commands.docs = () => import('./commands/docs.js').then(resolveCommand);
  if (!noBuiltins && cliConfig?.info !== false)
    commands.info = () => import('./commands/info.js').then(resolveCommand);
  if (!noBuiltins && cliConfig?.new !== false)
    commands.new = () => import('./commands/new.js').then(resolveCommand);
  if (!noBuiltins && cliConfig?.generate !== false)
    commands.generate = () =>
      import('./commands/generate.js').then(resolveCommand);
  if (!noBuiltins && cliConfig?.compile !== false)
    commands.compile = () =>
      import('./commands/compile.js').then(resolveCommand);
  if (!noBuiltins && cliConfig?.dev !== false)
    commands.dev = () => import('./commands/dev.js').then(resolveCommand);
  if (!noBuiltins && cliConfig?.build !== false)
    commands.build = () => import('./commands/build.js').then(resolveCommand);
  if (!noBuiltins && cliConfig?.preview !== false)
    commands.preview = () =>
      import('./commands/preview.js').then(resolveCommand);
  if (!noBuiltins && cliConfig?.module !== false)
    commands.module = () => import('./commands/module.js').then(resolveCommand);
  // expanded commands
  const expandedCommands = await setupCLIExpansion(tiniProject);
  for (const [key, value] of Object.entries(expandedCommands)) {
    if (commands[key]) continue;
    commands[key] = value;
  }
  // result
  return commands;
}

async function runApp() {
  const {version, description} = await loadCLIPackageJSON();
  const tiniProject = await getTiniProject();
  return runMain(
    defineCommand({
      meta: {
        name: 'tini',
        version,
        description,
      },
      setup() {
        tiniProject.hooks.callHook('cli:setup');
      },
      cleanup() {
        tiniProject.hooks.callHook('cli:cleanup');
      },
      subCommands: await getCommands(tiniProject),
    })
  );
}

runApp();
