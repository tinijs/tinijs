#!/usr/bin/env node
import {SubCommandsDef, defineCommand, runMain} from 'citty';

import {TiniProject, getTiniProject} from '@tinijs/project';

import {loadCLIPackageJSON} from './utils/project.js';
import {resolveCommand, setupCLIExpansion} from './utils/cli.js';

async function getCommands(tiniProject: TiniProject) {
  const cliConfig = tiniProject.config.cli;
  const commands: SubCommandsDef = {};
  // built-in commands
  if (cliConfig?.docs !== false)
    commands.docs = () => import('./commands/docs.js').then(resolveCommand);
  if (cliConfig?.new !== false)
    commands.new = () => import('./commands/new.js').then(resolveCommand);
  if (cliConfig?.dev !== false)
    commands.dev = () => import('./commands/dev.js').then(resolveCommand);
  if (cliConfig?.build !== false)
    commands.build = () => import('./commands/build.js').then(resolveCommand);
  if (cliConfig?.preview !== false)
    commands.preview = () =>
      import('./commands/preview.js').then(resolveCommand);
  if (cliConfig?.module !== false)
    commands.module = () => import('./commands/module.js').then(resolveCommand);
  if (cliConfig?.generate !== false)
    commands.generate = () =>
      import('./commands/generate.js').then(resolveCommand);
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
