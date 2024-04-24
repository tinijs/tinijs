import mri from 'mri';
import {resolve} from 'pathe';
import {readdir, stat} from 'node:fs/promises';
import {readJSONSync, readJSON, writeJSON, pathExistsSync} from 'fs-extra/esm';
import {execa} from 'execa';
import {consola} from 'consola';
import {green, blueBright} from 'colorette';
import type {PackageJson} from 'type-fest';

interface Args {
  dir?: string;
  pick?: string;
  version?: string;
}

interface VersionChange {
  packageName: string;
  fromVersion: string;
  toVersion: string;
}

interface AvailablePackage extends VersionChange {
  dirName: string;
  dirPath: string;
}

interface SyncResult extends AvailablePackage {
  dependencies: VersionChange[];
  devDependencies: VersionChange[];
  peerDependencies: VersionChange[];
}

class ReleaseUI {
  readonly version: string;

  constructor(private args: mri.Argv<Args>) {
    this.version =
      this.args.version ||
      (readJSONSync('lerna.json') as {version: string}).version;
  }

  async run() {
    const {dir = './packages/ui/build', pick} = this.args;
    const availablePackages = await this.loadAvailablePackages(
      dir,
      (_, packageJSON) => packageJSON.version !== this.version,
      pick?.split(',').map(item => item.trim())
    );
    if (!availablePackages.length) {
      return consola.error('No prebuilt UI packages available for releasing!');
    }

    // confirmation
    this.printItemsSummary(
      () => consola.info('Found the following prebuilt UI packages:'),
      availablePackages
    );
    const confirm = await consola.prompt('Process further and release?', {
      type: 'confirm',
    });
    if (!confirm) {
      return consola.warn(
        'Release workflow for prebuilt UI packages has been cancelled!\n'
      );
    }

    // processe & release
    for (const availablePackage of availablePackages) {
      await this.syncVersionAndTiniDependencies(availablePackage);
      await execa('npm', ['publish', '--access', 'public'], {
        cwd: availablePackage.dirPath,
      });
    }
    this.printItemsSummary(
      () =>
        consola.success(
          'Prebuilt UI packages have been released successfully:'
        ),
      availablePackages
    );
  }

  private printItemsSummary(
    logHeadline: () => void,
    availablePackages: AvailablePackage[]
  ) {
    console.log();
    logHeadline();
    console.log(
      '  + ' +
        availablePackages
          .map(
            ({packageName, fromVersion, toVersion}) =>
              `${blueBright(packageName)} ${fromVersion} -> ${green(toVersion)}`
          )
          .join('\n  + ')
    );
    console.log();
  }

  private async loadAvailablePackages(
    rootDir: string,
    filter: (dirName: string, packageJSON: PackageJson) => boolean = () => true,
    picks?: string[]
  ) {
    const result = [] as AvailablePackage[];
    for (const dirName of await readdir(resolve(rootDir))) {
      // check if valid directory
      const dirPath = resolve(rootDir, dirName);
      const stats = await stat(dirPath);
      if (dirName.startsWith('.') || !stats.isDirectory()) continue;

      // check package.json
      const packageJSONPath = resolve(dirPath, 'package.json');
      const packageJSON = !pathExistsSync(packageJSONPath)
        ? null
        : ((await readJSON(packageJSONPath)) as PackageJson);
      if (!packageJSON) continue;

      // filter & picks
      if (!filter(dirName, packageJSON) || (picks && !picks.includes(dirName)))
        continue;

      // valid package
      result.push({
        dirName,
        dirPath,
        packageName: packageJSON.name as string,
        fromVersion: packageJSON.version as string,
        toVersion: this.version,
      });
    }
    return result;
  }

  private async syncVersionAndTiniDependencies(
    availablePackage: AvailablePackage
  ) {
    const packageJSONPath = resolve(availablePackage.dirPath, 'package.json');
    const packageJSON = (await readJSON(packageJSONPath)) as PackageJson;
    const syncResult: SyncResult = {
      ...availablePackage,
      dependencies: [] as VersionChange[],
      devDependencies: [] as VersionChange[],
      peerDependencies: [] as VersionChange[],
    };
    // update version
    packageJSON.version = this.version;
    // sync dependencies
    const syncDependencies = (
      deps: NonNullable<PackageJson['dependencies']>
    ) => {
      const changes: VersionChange[] = [];
      Object.entries(deps).forEach(([packageName, currentVersion]) => {
        if (!packageName.startsWith('@tinijs/')) return;
        const newVersion = `^${this.version}`;
        deps[packageName] = newVersion;
        changes.push({
          packageName,
          fromVersion: currentVersion as string,
          toVersion: newVersion,
        });
      });
      return changes;
    };
    if (packageJSON.dependencies) {
      syncResult.dependencies = syncDependencies(packageJSON.dependencies);
    }
    if (packageJSON.devDependencies) {
      syncResult.devDependencies = syncDependencies(
        packageJSON.devDependencies
      );
    }
    if (packageJSON.peerDependencies) {
      syncResult.peerDependencies = syncDependencies(
        packageJSON.peerDependencies
      );
    }
    // save file
    await writeJSON(packageJSONPath, packageJSON, {spaces: 2});
    // result
    return syncResult;
  }
}

new ReleaseUI(mri(process.argv.slice(2))).run();
